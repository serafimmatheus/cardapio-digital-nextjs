'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/_components/ui/button'
import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/app/app/(home)/categorias/_actions/get-categories'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const formSchema = z.object({
  category: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export function SelectCategory() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const {
    data: categories,
    isError: isErrorCategories,
    isFetching: isFetchingCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  function onSubmit(data: FormSchema) {
    if (data.category === 'all') {
      return router.push(`${pathname.toString()}`)
    }

    return router.push(
      `${pathname.toString()}?${createQueryString('category', data.category)}`
    )
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex items-center gap-2'
    >
      {isFetchingCategories ? (
        <p>Carregando...</p>
      ) : (
        <Suspense>
          <Controller
            control={form.control}
            name='category'
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  searchParams.get('category')
                    ? searchParams.get('category')!
                    : field.value
                }
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Categoria' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectContent>
                      <SelectItem value={'all'}>Todos</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Button size='icon' type='submit'>
            <Search />
          </Button>
        </Suspense>
      )}

      {isErrorCategories && <p>Erro ao carregar categorias</p>}
    </form>
  )
}
