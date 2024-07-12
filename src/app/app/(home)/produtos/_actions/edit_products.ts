import { api } from '@/app/_lib/api'

export interface Product {
  name: string
  slug: string
  description?: string | null
  price: string
  image?: string | null
  isActive?: boolean
  categories: string[]
}

interface EditProductIProps {
  product: Product
  slug: string
}

export async function editProducts({ product, slug }: EditProductIProps) {
  const response = await api.put(`/products/${slug}/update`, product)
  return response.data
}
