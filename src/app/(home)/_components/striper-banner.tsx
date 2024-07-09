import Image from 'next/image'

export function StripperBanner() {
  return (
    <div className='grid grid-cols-2 gap-x-1 gap-y-5 pt-16'>
      <div className='relative flex gap-3 items-center'>
        <Image
          src={'/cart.svg'}
          alt='Icone de carrinho de compras'
          sizes='100vw'
          className='size-8 object-cover bg-[#C47F17] p-2 rounded-full select-none'
          width={0}
          height={0}
        />

        <span className='text-sm md:text-base'>Compra simples e segura</span>
      </div>

      <div className='relative flex gap-3 items-center'>
        <Image
          src={'/box.svg'}
          alt='Icone de carrinho de compras'
          sizes='100vw'
          className='size-8 object-cover bg-[#574F4D] p-2 rounded-full select-none'
          width={0}
          height={0}
        />
        <span className='text-sm md:text-base'>
          Embalagem mantém o café intacto
        </span>
      </div>

      <div className='relative flex gap-3 items-center'>
        <Image
          src={'/timer.svg'}
          alt='Icone de carrinho de compras'
          sizes='100vw'
          className='size-8 object-cover bg-[#DBAC2C] p-2 rounded-full select-none'
          width={0}
          height={0}
        />

        <span className='text-sm md:text-base'>Entrega rápida e rastreada</span>
      </div>

      <div className='relative flex gap-3 items-center'>
        <Image
          src={'/coffee.svg'}
          alt='Icone de carrinho de compras'
          sizes='100vw'
          className='size-8 object-cover bg-[#8047F8] p-2 rounded-full select-none'
          width={0}
          height={0}
        />

        <span className='text-sm md:text-base'>
          O café chega fresquinho até você
        </span>
      </div>
    </div>
  )
}
