'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DarkTheme } from '../ui/dark-theme'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/app/(home)/action'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import nookies from 'nookies'
import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Button } from '../ui/button'
import SideBarApp from '@/app/app/(home)/_components/side-bar'
import { Menu } from 'lucide-react'
import SideBarMobileApp from '@/app/app/(home)/_components/side-bar-mobile'

export function Header() {
  const router = useRouter()
  const { data: currentUser, isError } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
  })

  if (isError) {
    nookies.destroy(null, '@token:coffee')
    router.push('/autenticacao/login')
  }

  return (
    <header>
      <Card className='rounded-none p-0'>
        <CardContent className='px-2 md:px-5 py-4 max-w-7xl mx-auto flex items-center justify-between'>
          <Link href={'/'}>
            <Image
              src={'/Logo.svg'}
              alt='coffee delivery'
              className='select-none'
              width={85}
              height={40}
            />
          </Link>

          <div className='md:flex items-center gap-3 hidden'>
            {currentUser && (
              <Link href={'/app'}>
                <div className='flex gap-1'>
                  <Avatar>
                    <AvatarImage src={currentUser.user.image} alt='@shadcn' />
                    <AvatarFallback>
                      {currentUser.user.name[0]}
                      {currentUser.user.name.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col w-32 truncate'>
                    <span className='text-sm font-bold truncate text-muted-foreground'>
                      {currentUser.user.name}
                    </span>
                    <span className='text-sm font-bold truncate text-muted-foreground'>
                      {currentUser.user.email}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <DarkTheme />
          </div>

          {currentUser && (
            <div className='md:hidden flex items-center gap-2'>
              <Link href={'/app'}>
                <Avatar>
                  <AvatarImage src={currentUser.user.image} alt='@shadcn' />
                  <AvatarFallback>
                    {currentUser.user.name[0]}
                    {currentUser.user.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button size='icon' variant='outline'>
                    <Menu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent className='bg-card p-0'>
                  <CardHeader>
                    <CardTitle className='text-xl'>Menu</CardTitle>
                  </CardHeader>
                  <div className='grid gap-4 py-4'>
                    <SideBarMobileApp />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </CardContent>
      </Card>
    </header>
  )
}
