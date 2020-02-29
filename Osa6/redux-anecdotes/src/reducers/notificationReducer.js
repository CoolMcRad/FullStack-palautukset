const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'VOTE_NOTIFY':
        return `You Voted For: ${action.anecdote}`
      case `ADD_NOTIFY`:
        return `Added Anecdote: ${action.anecdote}`
      case `NOTIFY`:
        return action.notification
      case `TIMEOUT`:
        return null
      default:
        return state
    }
  }

  export const timeOut = () => {
    return {
      type: 'TIMEOUT',
    }
  }

  export const notifyAddAnecdote = anecdote => {
    return {
      type: 'ADD_NOTIFY',
      anecdote,
    }
  }

  export const notifyVote = anecdote => {
    return {
      type: 'VOTE_NOTIFY',
      anecdote,
    }
  }

  let timeoutID

  export const setNotification = (message, time) => {
    clearTimeout(timeoutID)
    return async dispatch => {
      const timeToSeconds = time * 1000
      let notification = message
      
      dispatch({
        type: 'NOTIFY',
        notification,
      })

      notification = null
      timeoutID = setTimeout(() => {
        dispatch({
          type: 'NOTIFY',
          notification,
        })
      }, timeToSeconds)
    }
  }
  
  export default notificationReducer