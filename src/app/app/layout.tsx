import type { Metadata } from 'next'
import SideBarApp from './(home)/_components/side-bar'

export const metadata: Metadata = {
  title: 'Coffee | App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='grid grid-cols-4 max-w-7xl mx-auto md:px-5 py-10 md:py-20'>
      <div className='hidden md:block'>
        <SideBarApp />
      </div>
      <main className='col-span-4 md:col-span-3'>{children}</main>
    </div>
  )
}
