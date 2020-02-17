const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username) {
      return response.status(400).send({ error: 'username missing' })
  }
  if (body.username.lenght < 3) {
    return response.status(400).send({ error: 'username is too short' })
  }

  if (!body.password) {
    return response.status(400).send({ error: 'password missing' })
  }
  if (body.password.lenght < 3) {
      return response.status(400).send({ error: 'password is too short' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
  })

module.exports = usersRouter