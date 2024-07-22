'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { useToast } from '@/app/_components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { editCategories } from '../_actions/edit-category'
import { Switch } from '@/app/_components/ui/switch'
import { useRouter } from 'next/navigation'
import { getCategories } from '../_actions/get-categories'

const schemaEditCategory = z.object({
  name: z.string(),
  slug: z.string(),
  isActive: z.boolean(),
})

type EditCategory = z.infer<typeof schemaEditCategory>

export function FormEditCategory({ slug }: { slug: string }) {
  const { toast } = useToast()
  const router = useRouter()

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const filterCategory = categoryData?.find(
    (category) => category.slug === slug
  )

  const { mutateAsync: editCategoriesFn } = useMutation({
    mutationFn: editCategories,
    onError: (error) => {
      toast({
        title: 'Erro ao criar categoria',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Categoria criada com sucesso',
        description: 'success',
      })

      router.push('/app/categorias')
    },
  })

  const { register, handleSubmit, control } = useForm<EditCategory>({
    resolver: zodResolver(schemaEditCategory),
    defaultValues: {
      name: filterCategory?.name,
      slug: filterCategory?.slug,
      isActive: filterCategory?.isActive,
    },
  })

  async function handleEditCategory(data: EditCategory) {
    await editCategoriesFn({
      category: data,
      slug,
    })
  }

  function handleBackPage() {
    router.back()
  }

  return (
    <form onSubmit={handleSubmit(handleEditCategory)}>
      <div className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <Label>Produto ativado?</Label>
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div className='space-y-1'>
          <Label>Nome</Label>
          <Input type='text' {...register('name')} />
        </div>

        <div className='space-y-1'>
          <Label>Slug</Label>
          <Input type='text' {...register('slug')} />
        </div>
      </div>

      <CardFooter className='px-0 py-6 gap-2 justify-end'>
        <Button onClick={handleBackPage} type='button' variant='outline'>
          Cancelar
        </Button>
        <Button type='submit'>Editar categoria</Button>
      </CardFooter>
    </form>
  )
}
