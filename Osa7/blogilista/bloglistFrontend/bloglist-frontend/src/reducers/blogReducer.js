import blogService from '../services/blogs'

export const like = (content) => {
  return async dispatch => {
    const changed = { ...content, 
      likes: content.likes+1 
    }
    const blog = await blogService.update(content.id, changed)
    const id = blog.id
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const createBlog = content => {

  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const comment = content => {
    return async dispatch => {
      await blogService.comment(1337, content)
    }
  }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const deleteBlog = (id) => {
    return dispatch => {
      blogService.del(id)
      dispatch({
        type: 'DEL_BLOG',
        data: id,
      })
    }
  }

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const id = action.data.id
      const toChange = state.find(n => n.id === id)
      const changedAnecdote = { ...toChange, 
        likes: toChange.likes+1 
      }
      return state.map(a =>
        a.id !== id ? a : changedAnecdote
      ).sort(function (a, b) {
        return b.likes - a.likes
      })
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'DEL_BLOG':
        const id_2 = action.data
      return state.filter(b => b.id !== id_2)
    default:

  return state
    }
}

export default reducer