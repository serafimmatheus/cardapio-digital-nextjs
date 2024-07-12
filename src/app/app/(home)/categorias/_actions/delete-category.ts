import { api } from '@/app/_lib/api'

export interface DeleteCategoryIProps {
  slug: string
}

export async function deleteCategories({ slug }: DeleteCategoryIProps) {
  const response = await api.delete(`/categories/${slug}/delete`)
  return response.data
}
