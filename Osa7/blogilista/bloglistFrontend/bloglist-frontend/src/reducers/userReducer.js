import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
      case `SET_USER`:
        return action.data
      case `DEL_USER`:
        return null
      default:
        return state
    }
  }

  export const userLogout = () => {
    return dispatch => {
      
      dispatch({
        type: 'DEL_USER'
      })
    }
  }

  export const initializeUser = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          blogService.setToken(user.token)
          dispatch({
            type: 'SET_USER',
            data: user
          })
        }
    }
  }

  export const userLogin = (user) => {
    return dispatch => {
            dispatch({
                type: 'SET_USER',
                data: user
              })
    }
  }
  
  export default userReducer