'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { useToast } from '@/app/_components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateProfilePassword } from '../_active/update-profile-password'

const schemaEditProfile = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

type FormEditProfileType = z.infer<typeof schemaEditProfile>

export function FormEditPassword() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)

  const { register, handleSubmit, reset } = useForm<FormEditProfileType>({
    resolver: zodResolver(schemaEditProfile),
  })

  const { mutateAsync: updateProfilePasswordFn, isPending } = useMutation({
    mutationFn: updateProfilePassword,
    onMutate: async (updateProfile) => {
      await queryClient.cancelQueries({
        queryKey: ['current-user'],
      })

      const previousProducts = queryClient.getQueryData(['current-user'])

      queryClient.setQueryData(['current-user'], (old: any) => {
        return {
          ...old,
          ...updateProfile,
        }
      })

      return { previousProducts }
    },

    onError: (error) => {
      toast({
        title: 'Erro ao atualizar senha',
        description: error.message,
      })
    },

    onSuccess: () => {
      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi atualizada com sucesso',
      })
      reset()
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      })
    },
  })

  async function onSubmit(data: FormEditProfileType) {
    await updateProfilePasswordFn(data)
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
        <Button disabled={isPending} type='submit'>
          Salvar
        </Button>
      </CardFooter>
    </form>
  )
}
