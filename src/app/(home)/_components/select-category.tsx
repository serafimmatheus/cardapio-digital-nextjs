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

import { useToast } from '@/app/_components/ui/use-toast'
import { Button } from '@/app/_components/ui/button'

import { Search } from 'lucide-react'

const formSchema = z.object({
  category: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export function SelectCategory() {
  const { toast } = useToast()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: FormSchema) {
    console.log(data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex items-center gap-2'
    >
      <Controller
        control={form.control}
        name='category'
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Categoria' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectContent>
                  <SelectItem value='tradicional'>Tradicional</SelectItem>
                  <SelectItem value='gelado'>Gelado</SelectItem>
                  <SelectItem value='com-leite'>Com Leite</SelectItem>
                  <SelectItem value='especial'>Especial</SelectItem>
                  <SelectItem value='alcoolico'>ALCOÓLICO</SelectItem>
                </SelectContent>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Button size='icon' type='submit'>
        <Search />
      </Button>
    </form>
  )
}
