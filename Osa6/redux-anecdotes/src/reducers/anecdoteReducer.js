import anecdoteService from '../services/anecdotes'

export const addVote = (content) => {
  return async dispatch => {
    const changed = { ...content, 
      votes: content.votes+1 
    }
    const anecdote = await anecdoteService.update(content.id, changed)
    const id = anecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort(function (a, b) {
      return b.votes - a.votes
    })
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(n => n.id === id)
      const changedAnecdote = { ...toChange, 
        votes: toChange.votes+1 
      }
      return state.map(a =>
        a.id !== id ? a : changedAnecdote
      ).sort(function (a, b) {
        return b.votes - a.votes
      })
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:

  return state
    }
}

export default reducer