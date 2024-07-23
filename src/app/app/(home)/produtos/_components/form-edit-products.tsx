'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { Switch } from '@/app/_components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getCategories } from '../../categorias/_actions/get-categories'
import { Checkbox } from '@/app/_components/ui/checkbox'

import { editProducts } from '../_actions/edit_products'
import { useToast } from '@/app/_components/ui/use-toast'
import { getAllProducts } from '@/app/(home)/action'
import { uploadImageProducts } from '../_actions/uploadProducts'
import Image from 'next/image'

const schemaEditProduct = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  price: z.string(),
  image: z.any().optional(),
  isActive: z.boolean().default(true),
  categories: z.array(z.string()).refine((name) => name.some((item) => item)),
})

type EditProduct = z.infer<typeof schemaEditProduct>

export function FormEditProducts({ slug }: { slug: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = new QueryClient()

  const { data: categoriesData, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  const { mutateAsync: editProductsFn, isPending } = useMutation({
    mutationFn: editProducts,
    onError: (error) => {
      toast({
        title: 'Erro ao editar o produto',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Produto editado com sucesso',
        description: 'success',
      })
      router.push('/app/produtos')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      router.back()
    },
  })
  const filteredProduct = productsData?.find((product) => product.slug === slug)

  const form = useForm<EditProduct>({
    resolver: zodResolver(schemaEditProduct),
    defaultValues: {
      isActive: filteredProduct?.isActive,
      name: filteredProduct?.name,
      slug: filteredProduct?.slug,
      description: filteredProduct?.description,
      price: filteredProduct?.price,
      categories: filteredProduct?.categories.map((item) => item.slug),
    },
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: 'image',
  })

  async function handleEditProduct(data: EditProduct) {
    const formData = new FormData()
    formData.append('slug', data.slug)
    data.image && formData.append('image', data.image[0]!)

    if (data.image instanceof FileList) {
      const response = await uploadImageProducts(formData)

      await editProductsFn({
        product: { ...data, image: response.image },
        slug,
      })
    }

    await editProductsFn({
      product: {
        name: data.name,
        description: data.description,
        price: data.price,
        isActive: data.isActive,
        categories: data.categories,
        slug: data.slug,
      },
      slug,
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
        <form onSubmit={form.handleSubmit(handleEditProduct)}>
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
              {form.formState.errors?.name && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors?.name.message}
                </p>
              )}
            </div>

            <div className='space-y-1'>
              <Label>Slug</Label>
              <Input {...form.register('slug')} />
              {
                <p className='text-red-500 text-sm'>
                  {form.formState.errors?.slug?.message}
                </p>
              }
            </div>

            <div className='space-y-1'>
              <Label>Descrição</Label>
              <Input {...form.register('description')} />
              {
                <p className='text-red-500 text-sm'>
                  {form.formState.errors?.description?.message}
                </p>
              }
            </div>

            <div className='space-y-1'>
              <Label>Image URL</Label>
              <div className='relative'>
                <Image
                  src={filteredProduct?.image!}
                  width={0}
                  height={0}
                  sizes='100vw'
                  alt='Product Image'
                  className='size-20'
                />
              </div>
              {imageFields.map((field, index) => (
                <div key={field.id} className='flex flex-row items-center'>
                  <Input {...form.register('image')} type='file' />
                  <Button
                    variant='outline'
                    onClick={() => removeImage(index)}
                    type='button'
                  >
                    Remover
                  </Button>
                </div>
              ))}
              {imageFields.length < 1 && (
                <Button
                  onClick={() => appendImage({})}
                  variant='outline'
                  type='button'
                >
                  Atualizar imagem
                </Button>
              )}
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
            <Button
              disabled={isPending}
              onClick={handleBackPage}
              variant='outline'
              type='button'
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending}>
              Editar produto
            </Button>
          </CardFooter>
        </form>
      )}
    </>
  )
}
