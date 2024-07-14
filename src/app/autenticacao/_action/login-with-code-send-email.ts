import { api } from '@/app/_lib/api'

interface LoginWithCodeSendEmail {
  code: string
}

export async function loginWithCodeSendEmail({ code }: LoginWithCodeSendEmail) {
  const response = await api.post('/session/code-verify', { code })

  return response.data
}
