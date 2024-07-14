import axios from 'axios'
import nookies from 'nookies'

const cookies = nookies.get(null, '@token:coffee')

if (cookies) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${cookies['@token:coffee']}`
}

export const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})
