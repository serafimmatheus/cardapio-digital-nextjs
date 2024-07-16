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

interface User {
  user: {
    id: string
    name: string
    email: string
    image: string
    emailVerified: Date
  }
}

export async function getAllProducts() {
  const response = await api.get<Product[]>('/products')
  return response.data
}

export async function getCurrentUser() {
  const response = await api.get<User>('/profile')
  return response.data
}

export async function logOut() {
  await nookies.destroy(null, '@token:coffee')
}
