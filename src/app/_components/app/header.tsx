'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DarkTheme } from '../ui/dark-theme'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { getCurrentUser, User } from '@/app/(home)/action'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import nookies from 'nookies'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import SideBarMobileApp from '@/app/app/(home)/_components/side-bar-mobile'
import { useEffect, useState } from 'react'

export function Header() {
  const [currentUser, setCurrentUser] = useState<User>()
  const router = useRouter()
  const { mutateAsync: getCurrentUserFn, isError } = useMutation({
    mutationFn: getCurrentUser,
    onError: async () => {
      nookies.destroy(null, '@token:coffee')
      return router.push('/autenticacao/login')
    },
    onSuccess: (data) => {
      setCurrentUser(data)
    },
  })

  if (isError) {
    nookies.destroy(null, '@token:coffee')
    router.push('/autenticacao/login')
  }

  useEffect(() => {
    getCurrentUserFn()
  }, [getCurrentUserFn])

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
                    <AvatarImage src={currentUser.user.image!} alt='@shadcn' />
                    <AvatarFallback className='uppercase'>
                      {currentUser.user.name![0]}
                      {currentUser.user.name![1]}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col w-32 truncate'>
                    <span className='text-sm font-bold truncate text-muted-foreground capitalize'>
                      {currentUser.user.name}
                    </span>
                    <span className='text-sm font-bold truncate text-muted-foreground lowercase'>
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
                  <AvatarImage src={currentUser.user.image!} alt='@shadcn' />
                  <AvatarFallback>
                    {currentUser.user.name![0]}
                    {currentUser.user.name![1]}
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
