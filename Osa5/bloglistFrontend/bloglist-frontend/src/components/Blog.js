import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, remove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle} className='blog'>
    <div>
      <div style={hideWhenVisible}>
      {blog.title} {blog.author}
        <button id="show" onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
      <p>{blog.url}</p>
      <p>{blog.likes} 
      <button id="like" onClick = {handleLike} value={blog.id}>like</button> </p>
      <p>{blog.user.name}</p>
      <button onClick = {remove} value={blog.id}>delete</button>
      </div>
    </div>
  </div>
)
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
