const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title) throw response.status(400).send({ error: 'title and/or url missing' })
    if (!body.url) throw response.status(400).send({ error: 'title and/or url missing' })
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })
    
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  })

  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  })

  blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(newPerson => {
        response.json(newPerson.toJSON())
      })
      .catch(error => next(error))
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Attempted to delete unauthorized blog' })
    }
    
  })

  module.exports = blogsRouter