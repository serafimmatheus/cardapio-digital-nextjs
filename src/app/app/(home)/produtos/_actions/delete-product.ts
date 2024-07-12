import { api } from '@/app/_lib/api'

interface DeleteProductIProps {
  slug: string
}

export async function deleteProducts({ slug }: DeleteProductIProps) {
  const response = await api.delete(`/products/${slug}/delete`)
  return response.data
}
