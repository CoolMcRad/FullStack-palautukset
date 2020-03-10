import React, { useState } from 'react'
import { comment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const CommentForm = (id) => {
    const dispatch = useDispatch()
    const [commen, setCommen] = useState('')

    const handleComment = async (event) => {
        event.preventDefault()
        const b = id.id
        const c = {
            content: commen,
            blog: b
        }
        dispatch(comment(c))
      }

    return (
    <div>
    <form onSubmit={handleComment}>
    <Form.Group>
      <div>
          <Form.Control
          id="commen"
          type="text"
          value={commen}
          name="Comment"
          onChange={({ target }) => setCommen(target.value)}
        />
        <Button variant="primary" type="submit">add comment</Button>
      </div>
      </Form.Group>
    </form>      
    </div>
    )
}

export default CommentForm