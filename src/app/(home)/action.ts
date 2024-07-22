import { api } from '../_lib/api'
import nookies from 'nookies'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: string
  image: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  categories: Category[]
}

export interface Category {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  user: {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export async function getAllProducts() {
  const response = await api.get<Product[]>('/products')
  return response.data
}

export async function getCurrentUser() {
  const token = nookies.get(null, '@token:coffee')

  const response = await api.post('/auth/session', {
    token: `${token['@token:coffee']}`,
  })
  return response.data
}

export async function logOut() {
  const token = nookies.get(null, '@token:coffee')

  const response = await api.post('/auth/logout', {
    token: `${token['@token:coffee']}`,
  })

  nookies.destroy(null, '@token:coffee')
  return response.data
}

export async function getSession() {
  const response = await api.post<User>('/auth/session')
  return response.data
}
