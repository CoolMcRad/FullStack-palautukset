import React, {useState} from 'react' 
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const handleTitlehange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
}

  return (
    <div className="formDiv"> 
          <h2>create new blog</h2>

<form onSubmit={addBlog}>
  <div>
    title: <input 
    id='title'
    value={newTitle}
    onChange={handleTitlehange}
    />
  </div>
  <div>
    author: <input 
    id='author'
    value={newAuthor}
    onChange={handleAuthorChange}
    />
  </div>
  <div>
    url: <input 
    id='url'
    value={newUrl}
    onChange={handleUrlChange}
    />
  </div>
  <div>
    <button type="submit">Create</button>
  </div>
</form>
    </div>
  )
}
BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

export default BlogForm