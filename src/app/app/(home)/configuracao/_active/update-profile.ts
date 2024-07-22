import { api } from '@/app/_lib/api'

interface UpdateProfile {
  name: string
  image: string
  id: string
}

export async function updateProfile({ name, image, id }: UpdateProfile) {
  const response = await api.put(`/auth/${id}/update`, { name, image })
  return response.data
}
