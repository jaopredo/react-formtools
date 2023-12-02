import { FormtoolsForm } from './components'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'

interface UserLogin {
  email: string,
  password: string
}

export default function App() {
  const methods = useForm<UserLogin>()

  const handleSubmit: SubmitHandler<UserLogin> = (data: UserLogin) => {
    console.log(data)
  }

  return <div className="App">
    <FormtoolsForm onSubmit={methods.handleSubmit(handleSubmit)} methods={methods}>
      <button type="submit">ENVIAR</button>
    </FormtoolsForm>
  </div>
}
