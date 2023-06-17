import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  if(!newToken) {
    token = null
  } else {
    token = `bearer ${newToken}`
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
  }
  const response = await axios.post(baseUrl, newObject, {
    headers: headers
  })
  return response.data
}

const update = async (id, blogObject ) => {
  const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, {
    headers: headers
  })
  return response.data
}

const remove = async (id) => {
  const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
  }
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: headers
  })
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}