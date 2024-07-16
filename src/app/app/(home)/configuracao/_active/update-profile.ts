import { api } from '@/app/_lib/api'

interface UpdateProfile {
  name: string
  image: string
}

export async function updateProfile({ name, image }: UpdateProfile) {
  const response = await api.put('/profile/update', { name, image })
  return response.data
}
