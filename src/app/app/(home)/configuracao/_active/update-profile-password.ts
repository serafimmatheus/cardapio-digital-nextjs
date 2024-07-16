import { api } from '@/app/_lib/api'

interface UpdateProfile {
  oldPassword: string
  newPassword: string
}

export async function updateProfilePassword({
  oldPassword,
  newPassword,
}: UpdateProfile) {
  const response = await api.put('/profile/password/update', {
    oldPassword,
    newPassword,
  })
  return response.data
}
