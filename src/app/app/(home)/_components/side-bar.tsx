'use client'

import { logOut } from '@/app/(home)/action'
import { Button } from '@/app/_components/ui/button'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Home, LogOut, Network, PackageOpen, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideBarApp() {
  const pathName = usePathname()
  const queriClient = new QueryClient()

  const { mutateAsync: logOutFn } = useMutation({
    mutationFn: logOut,
    onSettled: async () => {
      queriClient.invalidateQueries({
        queryKey: ['current-user'],
      })
    },
  })

  return (
    <aside className='px-4'>
      <ul className='space-y-4'>
        <li>
          <Button
            asChild
            className={`w-full justify-start gap-2 items-center ${
              pathName === '/app' ? 'bg-primary' : 'bg-primary/70'
            } `}
          >
            <Link href={'/app'}>
              <Home size={18} />
              <span>Inicio</span>
            </Link>
          </Button>
        </li>

        <li>
          <Button
            asChild
            className={`w-full justify-start gap-2 items-center ${
              pathName.includes('/app/categorias')
                ? 'bg-primary'
                : 'bg-primary/70'
            } `}
          >
            <Link href={'/app/categorias'}>
              <Network size={18} />
              <span>Categoria</span>
            </Link>
          </Button>
        </li>

        <li>
          <Button
            asChild
            className={`w-full justify-start gap-2 items-center ${
              pathName.includes('/app/produtos')
                ? 'bg-primary'
                : 'bg-primary/70'
            } `}
          >
            <Link href={'/app/produtos'}>
              <PackageOpen size={18} />
              <span>Produtos</span>
            </Link>
          </Button>
        </li>

        <li>
          <Button
            asChild
            className={`w-full justify-start gap-2 items-center ${
              pathName.includes('/app/configuracao')
                ? 'bg-primary'
                : 'bg-primary/70'
            } `}
          >
            <Link href={'/app/configuracao'}>
              <Settings size={18} />
              <span>Configurações</span>
            </Link>
          </Button>
        </li>

        <li>
          <Button
            variant='destructive'
            asChild
            className={`w-full justify-start gap-2 items-center`}
            onClick={() => logOutFn}
          >
            <Link href={'/'}>
              <LogOut size={18} />
              <span>Sair</span>
            </Link>
          </Button>
        </li>
      </ul>
    </aside>
  )
}

export default SideBarApp
