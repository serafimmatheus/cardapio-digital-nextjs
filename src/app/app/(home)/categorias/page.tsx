import { Button } from '@/app/_components/ui/button'
import { TableCategory } from './_components/table-category'
import { Plus } from 'lucide-react'
import Link from 'next/link'

function CategoriesPage() {
  return (
    <div className='mx-auto w-full max-w-3xl px-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl'>Categorias</h1>

        <Button className='gap-2' asChild>
          <Link href={'/app/categorias/criar'}>
            <Plus size={18} />
            Nova Categoria
          </Link>
        </Button>
      </div>

      <TableCategory />
    </div>
  )
}

export default CategoriesPage
