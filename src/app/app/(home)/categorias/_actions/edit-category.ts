import { api } from '@/app/_lib/api'

export interface Category {
  name: string
  slug: string
  isActive: boolean
}

interface EditCategoryIProps {
  category: Category
  slug: string
}

export async function editCategories({ category, slug }: EditCategoryIProps) {
  const response = await api.put(`/categories/${slug}/update`, category)
  return response.data
}
