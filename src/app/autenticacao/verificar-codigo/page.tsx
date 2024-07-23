import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { FormVerifyCode } from './_components/form-verify-code'

export default function VerifyCodePage() {
  return (
    <Card className='self-start mx-auto w-full max-w-2xl p-0 lg:col-span-1 col-span-2'>
      <CardContent className='p-8'>
        <CardHeader className='font-bold text-2xl p-0 pb-5'>
          Insira o código
        </CardHeader>

        <FormVerifyCode />
      </CardContent>
    </Card>
  )
}
