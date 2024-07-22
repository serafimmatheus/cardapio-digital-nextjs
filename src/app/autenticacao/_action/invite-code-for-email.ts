import { api } from '@/app/_lib/api'

interface InviteCodeForEmail {
  email: string
  password: string
}

export async function inviteCodeForEmail({
  email,
  password,
}: InviteCodeForEmail) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}
