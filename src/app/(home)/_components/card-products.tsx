import Image from 'next/image'

interface ProductIProps {
  product: {
    id: string
    name: string
    categories: string[]
    description: string
    price: number
    image: string
  }
}

export function CardProducts({ product }: ProductIProps) {
  return (
    <div className='bg-[#F3F2F2] flex flex-col justify-between min-h-full p-5 rounded-tl-lg rounded-br-lg rounded-tr-3xl rounded-bl-3xl'>
      <div className='relative flex justify-center -top-12'>
        <Image
          src={product.image}
          alt={product.name}
          width={0}
          height={0}
          sizes='100vw'
          className='w-[100px] h-[100px] object-cover select-none'
        />
      </div>

      <div className='relative -top-8'>
        <div className='flex justify-center gap-2 flex-wrap'>
          {product.categories.map((category) => (
            <span
              key={category}
              className='bg-[#F1E9C9] text-[#C47F17] py-1 px-2 uppercase font-semibold text-[10px] rounded-full'
            >
              {category}
            </span>
          ))}
        </div>

        <div className='space-y-2 mt-8'>
          <h2 className='text-xl font-bold text-center'>{product.name}</h2>
          <p className='text-sm font-light text-center'>
            {product.description}
          </p>
        </div>

        <div className='mt-8'>
          <span>
            <span className='ml-1 text-2xl font-bold'>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
