import { api } from '../_lib/api'

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

export async function getAllProducts() {
  const response = await api.get<Product[]>('/products')
  return response.data
}
