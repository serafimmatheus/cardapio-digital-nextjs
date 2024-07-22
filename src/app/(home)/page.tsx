'use client'

import Image from 'next/image'
import { StripperBanner } from './_components/striper-banner'
import { CardProducts } from './_components/card-products'

import { SelectCategory } from './_components/select-category'
import { getAllProducts } from './action'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const {
    data: products,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  const filteredProducts = products?.filter((product) => {
    if (!category) return product

    return product.categories
      .map((category) => category.slug)
      .includes(category)
  })

  useEffect(() => {}, [category])

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

        <div className='w-full max-w-7xl mx-auto px-3 sm:px-5 h-full pb-10'>
          <div className='grid lg:grid-cols-2 grid-cols-1 pt-10 md:pt-20'>
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

      <div className='max-w-7xl mx-auto w-full px-3 sm:px-5 mt-6 md:mt-9 space-y-16'>
        <div className='flex flex-col sm:flex-row items-start gap-2 sm:gap-0 sm:items-center justify-between'>
          <h2 className='text-2xl md:text-3xl font-bold'>Nossos cafés</h2>

          <SelectCategory />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-16'>
          {isFetching
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className='bg-[#F3F2F2] animate-pulse h-[280px] flex flex-col justify-between min-h-full p-5 rounded-tl-lg rounded-br-lg rounded-tr-3xl rounded-bl-3xl'
                />
              ))
            : filteredProducts?.map((product) => (
                <CardProducts product={product} key={product.id} />
              ))}
        </div>

        {isError && (
          <div className='flex w-full h-[200px] justify-center items-center border border-destructive rounded-lg animate-pulse'>
            <p className='text-xs text-destructive'>
              Erro ao carregar produtos
            </p>
          </div>
        )}

        {filteredProducts?.length === 0 && (
          <div className='flex w-full h-[200px] justify-center items-center border border-destructive rounded-lg animate-pulse'>
            <p className='text-xs text-destructive'>
              Nenhum produto encontrado
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
