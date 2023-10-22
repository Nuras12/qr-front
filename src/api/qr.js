import axios from 'axios'
import { getHeader } from './user'

const client = axios.create({ baseURL: process.env.REACT_APP_API_URL })

export const getTicketById = async (id) => {
  const options = { headers: getHeader() }

  const response = await client.get(`/qr/${id}`, options)
  return response.data
}

export const apply = async (id, num) => {
  const options = { headers: getHeader() }
  const response = await client.patch(`/qr/${id}`, { count: num }, options) //, options)
  return response.data
}
