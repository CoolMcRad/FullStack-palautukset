import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const PhoneForm = ({ authors }) => {
  let a
  if (authors.length === 0) {
    a = ''
  } else {
    a = authors[0].name
  }

  const [name, setName] = useState(a)
  const [born, setBorn] = useState('')

  const [ changeBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, born: parseInt(born) } })

    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        <label>
            <div>
          <select value={name}
            onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          </div>
        </label>
        <div>
        born: <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default PhoneForm