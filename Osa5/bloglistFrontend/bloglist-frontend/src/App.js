import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const Notification =  ({ message })  => {
  if (message === null) {
    return null
  }
  const errorStyle = {
    color: 'black',
    background: `lightgrey`,
    fontSize: 40,
    borderStyle: `solid`,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={errorStyle} className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
    </div>
  )

  blogs.sort(function (a, b) {
    return b.likes - a.likes;
  })

  const handleRemoval = (event) => {
    if (window.confirm("Do you really want to delete this blog?")) { 
      blogService
      .del(event)
      setBlogs(blogs.filter(b => b.id !== event))
      setErrorMessage(`Deleted blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const remove = (event) => {
    let id = event.target.value
    const blog = blogs.find(n => n.id === id)

    if (!blog.user.name) {
      return (
        handleRemoval(id)
      )
    }
    if (user.name === blog.user.name) {
      return (
        handleRemoval(id)
      )
    }
  }

  const blogList = () => (
    <div>
    <h2>blogs</h2>
    <p>logged in as {user.name}
  <button onClick = {handleLogout}>logout</button></p>

    {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} remove={remove}/>
      )}
    </div>
  )

  const handleLike = event => {
    let id = event.target.value
    const blog = blogs.find(n => n.id === id)
    const newLikes = blog.likes+1
    const newBlog = { ...blog, likes: newLikes }

    let b = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: newBlog.user.id
    }

    blogService
      .update(id, b)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleLogout = event => {
    setErrorMessage(`logged out`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`Welcome ${user.username} !`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username/password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      setErrorMessage(`Please fill out the form`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`${blogObject.title} by ${blogObject.author} added !`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
  }

    const blogForm = () => (
    <Togglable buttonLabel="create new">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
      loginForm() :
      blogList()
    }
    </div>
  )
}

export default App