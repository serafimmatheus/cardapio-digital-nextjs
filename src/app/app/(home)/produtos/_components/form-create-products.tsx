'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { Switch } from '@/app/_components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getCategories } from '../../categorias/_actions/get-categories'
import { Checkbox } from '@/app/_components/ui/checkbox'

import { createProducts } from '../_actions/create_products'
import { useToast } from '@/app/_components/ui/use-toast'
import { uploadImageProducts } from '../_actions/uploadProducts'

const schemaCreateProduct = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  price: z.coerce.number(),
  image: z.any(),
  isActive: z.boolean().default(true),
  categories: z.array(z.string()).refine((name) => name.some((item) => item)),
})

export type CreateProduct = z.infer<typeof schemaCreateProduct>

export function FormCreateProducts() {
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = new QueryClient()

  const form = useForm<CreateProduct>({
    resolver: zodResolver(schemaCreateProduct),
    defaultValues: {
      isActive: true,
      categories: [],
    },
  })

  const { data: categoriesData, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const { mutateAsync: createProductsFn } = useMutation({
    mutationFn: createProducts,
    onError: (error) => {
      toast({
        title: 'Erro ao criar produto',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Produto criado com sucesso',
        description: 'success',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      router.back()
    },
  })

  async function handleCreateProduct(data: CreateProduct) {
    const formData = new FormData()
    formData.append('slug', data.slug)
    formData.append('image', data.image[0])

    const response = await uploadImageProducts(formData)

    await createProductsFn({
      product: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        image: response.image,
        isActive: data.isActive,
        categories: data.categories,
      },
    })
  }

  function handleBackPage() {
    router.back()
  }
  return (
    <>
      {isFetching ? (
        <p>Carregando</p>
      ) : (
        <form onSubmit={form.handleSubmit(handleCreateProduct)}>
          <div className='space-y-4'>
            <div className='flex flex-col space-y-2'>
              <Label>Produto ativado?</Label>
              <Controller
                name='isActive'
                control={form.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className='space-y-1'>
              <Label>Nome</Label>
              <Input {...form.register('name')} />
            </div>

            <div className='space-y-1'>
              <Label>Slug</Label>
              <Input {...form.register('slug')} />
            </div>

            <div className='space-y-1'>
              <Label>Descrição</Label>
              <Input {...form.register('description')} />
            </div>

            <div className='space-y-1'>
              <Label>Image URL</Label>
              <Input type='file' {...form.register('image')} />
            </div>

            <div className='space-y-1'>
              <Label>Preço</Label>
              <Input {...form.register('price')} />
            </div>

            <div className='space-y-1'>
              <Label>Relacionamento</Label>
              {categoriesData?.map((item) => (
                <Controller
                  key={item.id}
                  control={form.control}
                  name='categories'
                  render={({ field }) => {
                    return (
                      <div
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <Checkbox
                          checked={field.value?.includes(item.slug)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...(field.value || []),
                                  item.slug,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.slug
                                  )
                                )
                          }}
                        />

                        <div className='text-sm font-normal'>{item.name}</div>
                      </div>
                    )
                  }}
                />
              ))}
            </div>
          </div>

          <CardFooter className='py-4 px-0 gap-2 justify-end'>
            <Button onClick={handleBackPage} variant='outline' type='button'>
              Cancelar
            </Button>
            <Button>Criar produto</Button>
          </CardFooter>
        </form>
      )}
    </>
  )
}
