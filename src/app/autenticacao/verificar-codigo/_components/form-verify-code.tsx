'use client'

import { Button } from '@/app/_components/ui/button'
import nookies from 'nookies'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/app/_components/ui/input-otp'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { loginWithCodeSendEmail } from '../../_action/login-with-code-send-email'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/app/_components/ui/use-toast'

const schemaLoginCode = z.object({
  code: z.string().length(6, { message: 'Código inválido' }),
})

type LoginCode = z.infer<typeof schemaLoginCode>

export function FormVerifyCode() {
  const route = useRouter()
  const { toast } = useToast()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginCode>({
    resolver: zodResolver(schemaLoginCode),
  })

  const { mutateAsync: loginWithCodeSendEmailFn, isPending } = useMutation({
    mutationFn: loginWithCodeSendEmail,
    onError: async (error) => {
      toast({
        title: 'Erro ao enviar código',
        description: error.message,
      })
    },
    onSuccess: async (data) => {
      nookies.set(null, '@token:coffee', data.token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })

      route.push('/app')

      toast({
        title: 'Código verificado',
        description: 'Agora você está logado',
      })
    },
  })

  async function handleVerifyCode(data: LoginCode) {
    await loginWithCodeSendEmailFn({ code: data.code })
  }

  return (
    <form onSubmit={handleSubmit(handleVerifyCode)} className='space-y-4'>
      <Controller
        control={control}
        name='code'
        render={({ field }) => (
          <InputOTP maxLength={6} {...field}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      {errors.code && (
        <p className='text-red-500 text-xs font-semibold'>
          {errors.code.message}
        </p>
      )}

      <Button disabled={isPending} type='submit'>
        Enviar
      </Button>
    </form>
  )
}
