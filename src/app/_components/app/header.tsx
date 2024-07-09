import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

export function Header() {
  return (
    <header>
      <Card className='rounded-none p-0'>
        <CardContent className='px-5 py-4 max-w-7xl mx-auto'>
          <Image
            src={'/Logo.svg'}
            alt='coffee delivery'
            className='select-none'
            width={85}
            height={40}
          />
        </CardContent>
      </Card>
    </header>
  )
}
