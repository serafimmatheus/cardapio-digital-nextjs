import { api } from '@/app/_lib/api'

interface LoginWithCodeSendEmail {
  code: string
}

export async function loginWithCodeSendEmail({ code }: LoginWithCodeSendEmail) {
  const response = await api.post('/auth/verify-code', { code })

  return response.data
}
