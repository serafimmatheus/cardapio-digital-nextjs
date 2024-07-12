'use client'

import { Card, CardContent } from '@/app/_components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEditProducts } from '../../_components/form-edit-products'

function EditProductsPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  function handleBackPage() {
    router.back()
  }
  return (
    <div className='mx-auto w-full max-w-3xl px-5'>
      <div className='flex items-center gap-2'>
        <ArrowLeft
          size={24}
          onClick={handleBackPage}
          className='cursor-pointer'
        />
        <h1 className='text-2xl font-bold'>Editar produto</h1>
      </div>

      <Card className='mt-8'>
        <CardContent className='px-5 py-5'>
          <FormEditProducts slug={params.slug} />
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProductsPage
