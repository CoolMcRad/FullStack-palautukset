
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const [name, setName] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const authorQ = useQuery(ALL_AUTHORS)
  const bookQ = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  if (authorQ.loading | bookQ.loading | user.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setName(null)
    localStorage.clear()
    client.resetStore()
  }

  const authors = authorQ.data.allAuthors
  const books = bookQ.data.allBooks
  const kayttis = user.data.me

  if (kayttis && genre === null) {
    setGenre(kayttis.favoriteGenre)
  }
  if (kayttis && genre !== kayttis.favoriteGenre) {
    setGenre(kayttis.favoriteGenre)
  }

  const loginVaiLogout = () => {
    if (!token) {
      return <button onClick={() => setPage('login')}>login</button>
    }
      return (
        <div>
      <p> Logged in as {name}
       {'  '}<button onClick={() => logout()}>logout</button></p>
      </div>
      )
  }

  const näyttääköVaiEi = () => {
    if (!token) {
      return null
    }

      return (
        <div>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
        </div>
      )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {näyttääköVaiEi()}
        {loginVaiLogout()}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={books}
        token={token}
      />
      
      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        books={books}
        genre={genre}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setName={setName}
        setGenre={setGenre}
      />

    </div>
  )
}

export default App