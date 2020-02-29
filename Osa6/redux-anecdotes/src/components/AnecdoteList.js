import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer' 
import { setNotification } from '../reducers/notificationReducer' 

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter === "") {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 3))
  }

  return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}  
      </div>
  )
}

export default AnecdoteList