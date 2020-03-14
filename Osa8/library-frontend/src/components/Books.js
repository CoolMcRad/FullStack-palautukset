import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  const books = props.books
  let genres = []
  books.map(a =>
    a.genres.map(g => genres=genres.concat(g)))

  let unique = [...new Set(genres)]

  const handleGenre = (props) => {
    setGenre(props)
  }

  const genreButtons = () => (
      unique.map(g =>
          <button key={g} onClick={() => handleGenre(g)}>
              {g}
          </button>
        )
  )

  const bookDisplay = () => {
    if (genre === '') {
      return (
        <>
        {books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
        </>
      )
    }
    const b = books.filter(a => a.genres.includes(genre))
    return (
      <>
        {b.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
        </>
    )
  }

  return (
    <div>
      <h2>books</h2>
        <p>in genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookDisplay()}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )

}

export default Books