import React, { useState, useEffect } from 'react' 
import { Navbar, Nav, Button } from 'react-bootstrap'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserById from './components/UserById'
import Notification from './components/Notification'
import CommentForm from './components/CommentForm'
import LoginForm from './components/LoginForm'
import userService from './services/users'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeUser, userLogout } from './reducers/userReducer'
import { initializeBlogs, createBlog, deleteBlog, like } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleRemoval = (event) => {
    if (window.confirm("Do you really want to delete this blog?")) { 
      dispatch(deleteBlog(event))
      dispatch(setNotification(`Deleted blog`, 5))
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

  const handleLogout = event => {
    dispatch(setNotification(`Logged out`, 5))
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(userLogout())
  }

  const blogList = () => (
    <div>
      <Togglable buttonLabel="create new">
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} remove={remove}/>
      )}
    </div>
  )

  const addBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      dispatch(setNotification(`Please fill out the form`, 5))
    } else {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`${blogObject.title} by ${blogObject.author} added !`, 5))
    }
  }

    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        userService.getAll().then(users =>
          setUsers( users )
        )
        blogService.getComments(1337).then(comments =>
          setComments( comments )
        )
      }, [dispatch])

  const BlogById = () => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    if (!blog) {
      return null
    }

    const com = () => {
      const co = []
      comments.map(n => n.blog === id && co.push(n) )
      if (!co) {
        return null
      }
      return (
        <div style = {s2}>
          <CommentForm id={id}/>
          {co.map(comment =>
            <li key={comment.id}>
              {comment.content}
            </li>
          )}
        </div>
      )
    }

    return (
      <div style = {s2}>
        <h2>{blog.title}</h2>
        <p>{blog.likes} likes 
        <Button onClick={() => dispatch(like(blog))}>like</Button> </p>
        <p>Added by {blog.author}</p>
        <h3>Comments</h3>
        {com()}
      </div>
    )
  }

  const Menu = () => {
    return (
      <Router>
      <div>
        {header()}
      </div>
      <Switch>
      <Route path="/blogs/:id">
          <BlogById />
        </Route>
        <Route path="/users/:id">
          <UserById users={users} />
        </Route>
          <Route path="/users">
            <UserList users={users} />
          </Route>
          <Route path="/">
            {blogList()}
          </Route>
        </Switch>
  
      </Router>
    )
  }

  const s2 = {
    backgroundColor: "silver",
    borderBottomColor: "black",
    outlineStyle: "outset",
    outlineColor: "silver",
    outlineWidth: "10px"
  }

  const header = () => {
    const style = {
      color: "white",
      fontSize: 25,
    }
    const s1 = {
      backgroundColor: "black",
    borderBottomColor: "black",
    outlineStyle: "groove",
    outlineWidth: "6px"
    }
    return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <p style={style}>Logged in as {user.name}</p>
      <Nav.Link href="#" as="span">
      <Link style={s1} to="/">blogs</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={s1} to="/users">users</Link>
        </Nav.Link>
      <Button onClick = {handleLogout}>logout</Button>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      <h2 style={s2}>Blog App</h2>
    </div>
    )
  }

  const textStyle = {
    fontSize: 20,
    textShadow: "2px 2px 1px #0000ff, 1px 1px 1px #0000ff",
    fontVariant: "small-caps",
    fontStyle: "italic"
  }

  return (
    <div style={textStyle}className="container">
      <Notification />
      {user === null ?
      <LoginForm /> :
      Menu()
      }
    </div>
  )
}

export default App