import Link from 'next/link'
import { TableProducts } from './_components/table-products'
import { Plus } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'

function ProductsPage() {
  return (
    <div className='mx-auto w-full max-w-3xl px-3 md:px-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Produtos</h1>

        <Button asChild className='gap-2'>
          <Link href={'/app/produtos/criar'}>
            <Plus size={18} />
            <span className='hidden sm:block'>Novo Produto</span>
          </Link>
        </Button>
      </div>

      <TableProducts />
    </div>
  )
}

export default ProductsPage
