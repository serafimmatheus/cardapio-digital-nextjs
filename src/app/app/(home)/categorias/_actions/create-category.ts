import { api } from '@/app/_lib/api'

export interface Category {
  name: string
  slug: string
  isActive: boolean
}

interface CreateCategoryIProps {
  category: Category
}

export async function createCategories({ category }: CreateCategoryIProps) {
  const response = await api.post('/categories', category)
  return response.data
}
