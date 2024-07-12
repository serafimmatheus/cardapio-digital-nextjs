import { api } from '@/app/_lib/api'

export interface Category {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getCategories() {
  const response = await api.get<Category[]>('/categories')
  return response.data
}
