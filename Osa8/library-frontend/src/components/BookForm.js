import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_BOOK } from '../queries'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK)

  const submit = async (event) => {
    event.preventDefault()

    createBook({  variables: { title, author, published, genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <input value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genres <input value={genres}
            onChange={({ target }) => setGenres(genres.concat(target.value))}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default BookForm