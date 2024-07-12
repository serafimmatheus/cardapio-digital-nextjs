'use client'

import { Card, CardContent } from '@/app/_components/ui/card'
import FormCreateCategory from '../_components/form-create-category'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateCategoryPage() {
  const router = useRouter()

  function handleBackPage() {
    router.back()
  }

  return (
    <div className='mx-auto w-full max-w-3xl px-5'>
      <div className='flex items-center gap-2'>
        <ArrowLeft
          size={24}
          className='cursor-pointer'
          onClick={handleBackPage}
        />
        <h1 className='text-2xl font-bold'>Criar Categoria</h1>
      </div>

      <Card className='mt-8'>
        <CardContent className='px-5 py-5'>
          <FormCreateCategory />
        </CardContent>
      </Card>
    </div>
  )
}
