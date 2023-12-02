import { FormtoolsForm, FormtoolsInput } from './components'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'

import { IoMdPerson } from "react-icons/io"

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
      <FormtoolsInput
        label="Email: "
        type="email"
        name="email"
        id="email"
        help="Digite seu email"
        validation={{ required: true }}

        AfterIcon={<IoMdPerson/>}
      />

      <button type="submit">ENVIAR</button>
    </FormtoolsForm>
  </div>
}
