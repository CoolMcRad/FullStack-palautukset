import React from 'react'

const Recommend = (props) => {    
    
  if (!props.show ) {
    return null
  }
  let genre = props.genre
  const books = props.books

  const bookDisplay = () => {
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
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {genre}</p>
      <div>
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
    </div>
      
    </div>
  )
}

export default Recommend