const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case `NOTIFY`:
        return action.notification
      default:
        return state
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