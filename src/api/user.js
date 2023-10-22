import axios from 'axios'

const client = axios.create({ baseURL: process.env.REACT_APP_API_URL + '/users' })

export const getHeader = () => {
  const token = localStorage.getItem('access_token')
  return { Authorization: `Bearer ${token}` }
}

export const login = async (email, password) => {
  const response = await client.post('/login', { email, password })
  const token = response.data.access_token
  localStorage.setItem('access_token', token)
}

export const check = async () => {
  await client.get('/check', { headers: getHeader() })
}
