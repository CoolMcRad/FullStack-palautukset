import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { like } from '../reducers/blogReducer' 
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom"

const Blog = ({ blog, remove }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (blog) => {
    dispatch(like(blog))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

  <div  className='blog'>
    <Table bg="dark" variant="dark" striped>
      <tbody style={hideWhenVisible}>
        <tr>
        <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></td>
        <td><Button id="show" onClick={toggleVisibility}>show</Button></td>
        </tr>
      </tbody>
      <tbody style={showWhenVisible}>
        <tr>
          <td>{blog.title} {blog.author} </td>
          <td><Button onClick={toggleVisibility}>hide</Button></td>
        </tr>
      <tr><td>{blog.url}</td></tr>
      <tr>
        <td>{blog.likes} likes </td>
        <td><Button id="like" onClick={() => addLike(blog)}>like</Button> </td>
        </tr>
      <tr>
      <td>{blog.user.name}</td>
      <td><button className="btn btn-danger" onClick = {remove} value={blog.id}>delete</button></td>
      </tr>
      </tbody>
    </Table>
  </div>

)
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
