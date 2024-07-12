import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'

import { FormLogin } from './_components/form-login'

export default function LoginPage() {
  return (
    <Card className='self-start mx-auto w-full max-w-2xl'>
      <CardContent>
        <CardHeader>Faça seu login</CardHeader>

        <FormLogin />
      </CardContent>
    </Card>
  )
}
