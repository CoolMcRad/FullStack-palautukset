import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getComments = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then(response => response.data)
}

const comment = async ( id, newObject ) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, del, getComments, comment }