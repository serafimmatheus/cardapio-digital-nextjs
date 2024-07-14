'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { useToast } from '@/app/_components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaEditProfile = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

type FormEditProfileType = z.infer<typeof schemaEditProfile>

export function FormEditPassword() {
  const { toast } = useToast()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)

  const { register, handleSubmit } = useForm<FormEditProfileType>({
    resolver: zodResolver(schemaEditProfile),
  })

  async function onSubmit(data: FormEditProfileType) {
    console.log(data)

    toast({
      title: 'Perfil atualizado',
      description: (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Senha atual</Label>
          <div className='relative'>
            <Input
              type={showOldPassword ? 'text' : 'password'}
              {...register('oldPassword')}
            />
            {showOldPassword ? (
              <Eye
                size={18}
                className='absolute right-3 top-2.5 cursor-pointer'
                onClick={() => setShowOldPassword(false)}
              />
            ) : (
              <EyeOff
                size={18}
                className='absolute right-3 top-2.5 cursor-pointer'
                onClick={() => setShowOldPassword(true)}
              />
            )}
          </div>
        </div>

        <div className='space-y-1'>
          <Label>Senha nova</Label>
          <div className='relative'>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              {...register('newPassword')}
            />
            {showNewPassword ? (
              <Eye
                size={18}
                className='absolute right-3 top-2.5 cursor-pointer'
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <EyeOff
                size={18}
                className='absolute right-3 top-2.5 cursor-pointer'
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>
        </div>
      </div>

      <CardFooter className='pt-6 px-0'>
        <Button type='submit'>Salvar</Button>
      </CardFooter>
    </form>
  )
}
