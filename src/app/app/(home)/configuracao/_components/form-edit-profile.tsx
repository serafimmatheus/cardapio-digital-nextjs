'use client'

import { getCurrentUser } from '@/app/(home)/action'
import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { useToast } from '@/app/_components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateProfile } from '../_active/update-profile'

const schemaEditProfile = z.object({
  image: z.string(),
  name: z.string(),
})

type FormEditProfileType = z.infer<typeof schemaEditProfile>

export function FormEditProfile() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: currentUser } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
  })

  const { mutateAsync: updateProfileFn, isPending } = useMutation({
    mutationFn: updateProfile,
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

    onSuccess: () => {
      toast({
        title: 'Perfil atualizado',
        description: 'Seu perfil foi atualizado com sucesso',
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      })
    },
  })

  const { register, handleSubmit } = useForm<FormEditProfileType>({
    resolver: zodResolver(schemaEditProfile),
    defaultValues: {
      image: currentUser?.user.image,
      name: currentUser?.user.name,
    },
  })

  async function onSubmit(data: FormEditProfileType) {
    const newData = {
      ...data,
      id: currentUser?.user.id,
    }
    updateProfileFn(newData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Foto do perfil</Label>
          <Input {...register('image')} />
        </div>

        <div className='space-y-1'>
          <Label>Nome</Label>
          <Input {...register('name')} />
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
