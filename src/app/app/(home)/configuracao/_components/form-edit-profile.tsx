'use client'

import { getCurrentUser } from '@/app/(home)/action'
import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { useToast } from '@/app/_components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaEditProfile = z.object({
  image: z.string(),
  name: z.string(),
})

type FormEditProfileType = z.infer<typeof schemaEditProfile>

export function FormEditProfile() {
  const { toast } = useToast()
  const { data: currentUser } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
  })

  const { register, handleSubmit } = useForm<FormEditProfileType>({
    resolver: zodResolver(schemaEditProfile),
    defaultValues: {
      image: currentUser?.user.image,
      name: currentUser?.user.name,
    },
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
          <Label>Foto do perfil</Label>
          <Input {...register('image')} />
        </div>

        <div className='space-y-1'>
          <Label>Nome</Label>
          <Input {...register('name')} />
        </div>
      </div>

      <CardFooter className='pt-6 px-0'>
        <Button type='submit'>Salvar</Button>
      </CardFooter>
    </form>
  )
}
