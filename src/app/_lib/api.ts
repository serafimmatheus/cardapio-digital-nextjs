import axios from 'axios'
import nookies from 'nookies'

const cookies = nookies.get(null, '@token:coffee')

if (cookies) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${cookies['@token:coffee']}`
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
