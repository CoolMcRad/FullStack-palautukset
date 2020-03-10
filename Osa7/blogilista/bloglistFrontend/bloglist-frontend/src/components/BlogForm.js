import React, {useState} from 'react' 
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
<Form.Group>
  <div>
  <Form.Label>title:</Form.Label> 
  <Form.Control
    id='title'
    value={newTitle}
    onChange={handleTitlehange}
    />
  </div>
  <div>
  <Form.Label>author:</Form.Label> 
  <Form.Control
    id='author'
    value={newAuthor}
    onChange={handleAuthorChange}
    />
  </div>
  <div>
  <Form.Label>url:</Form.Label> 
  <Form.Control
    id='url'
    value={newUrl}
    onChange={handleUrlChange}
    />
  </div>
  <div>
    <Button variant="primary" type="submit">Create</Button>
  </div>
  </Form.Group>
</form>
    </div>
  )
}
BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

export default BlogForm