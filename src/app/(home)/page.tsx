import Image from 'next/image'
import { StripperBanner } from './_components/striper-banner'
import { CardProducts } from './_components/card-products'
import { products } from '../api/mock'

export default function Home() {
  return (
    <main className='pb-20'>
      <div className='relative'>
        <Image
          src={'/Background.svg'}
          alt='imagem de fundo. degrade claro com roxo e amarelo.'
          width={0}
          height={0}
          sizes='100vw'
          className='absolute w-full h-full object-cover select-none'
        />

        <div className='w-full max-w-7xl mx-auto px-5 h-full pb-10'>
          <div className='grid lg:grid-cols-2 grid-cols-1 pt-20'>
            <div className='space-y-4'>
              <h2 className='text-3xl md:text-5xl font-bold'>
                Encontre o café perfeito para qualquer hora do dia
              </h2>
              <p className='text-base md:text-xl'>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </p>

              <StripperBanner />
            </div>

            <div className='mx-auto'>
              <div className='relative'>
                <Image
                  src={'/Imagem.svg'}
                  alt='imagem de fundo. copo de café com o fundo cheio de graos.'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='w-[476px] h-[360px] object-cover select-none pt-16 md:pt-0'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto w-full px-5 mt-9 space-y-16'>
        <h2 className='text-2xl md:text-3xl font-bold'>Nossos cafés</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-16'>
          {products.map((product) => (
            <CardProducts product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  )
}
