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

interface CreateProductIProps {
  product: Product
}

export async function createProducts({ product }: CreateProductIProps) {
  const response = await api.post('/products', product)
  return response.data
}
