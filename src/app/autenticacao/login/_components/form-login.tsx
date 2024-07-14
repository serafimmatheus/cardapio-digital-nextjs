'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { useToast } from '@/app/_components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { inviteCodeForEmail } from '../../_action/invite-code-for-email'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormSchema = z.infer<typeof formSchema>

export function FormLogin() {
  const route = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const { mutateAsync: inviteCodeForEmailFn, isPending } = useMutation({
    mutationFn: inviteCodeForEmail,
    onSuccess: async () => {
      toast({
        title: 'Email enviado',
        description: 'Verifique seu email para continuar',
      })

      route.push('/autenticacao/verificar-codigo')
    },
    onError: (error) => {
      toast({
        title: 'Erro ao enviar email',
        description: error.message,
      })
    },
  })

  async function handleLogin(data: FormSchema) {
    await inviteCodeForEmailFn(data)
  }

  return (
    <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-10'>
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Email</Label>
          <Input type='email' {...form.register('email')} />
          {form.formState.errors.email && (
            <p className='text-red-500 text-xs'>
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className='space-y-1 relative'>
          <Label>Senha</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            {...form.register('password')}
          />

          <div className='absolute top-8 right-3'>
            {showPassword ? (
              <Eye
                size={18}
                onClick={() => setShowPassword(false)}
                className='cursor-pointer'
              />
            ) : (
              <EyeOff
                size={18}
                onClick={() => setShowPassword(true)}
                className='cursor-pointer'
              />
            )}
          </div>

          {form.formState.errors.password && (
            <p className='text-red-500 text-xs'>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <CardFooter className='p-0'>
        <Button disabled={isPending} type='submit'>
          Entrar
        </Button>
      </CardFooter>
    </form>
  )
}
