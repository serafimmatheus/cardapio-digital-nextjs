import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { FormEditPassword } from './_components/form-edit-password'
import { FormEditProfile } from './_components/form-edit-profile'

function SettingsPage() {
  return (
    <div className='mx-auto w-full max-w-3xl px-3 md:px-5'>
      <h1 className='text-2xl font-bold'>Configurações</h1>

      <Card className='mt-8'>
        <CardHeader className='text-xl font-semibold'>
          Alterar perfil
        </CardHeader>

        <CardContent>
          <FormEditProfile />
        </CardContent>
      </Card>

      <Card className='mt-8'>
        <CardHeader className='text-xl font-semibold'>Alterar senha</CardHeader>

        <CardContent>
          <FormEditPassword />
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
