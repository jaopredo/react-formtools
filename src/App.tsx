import {
  FormtoolsForm,
  FormtoolsInput,
  FormtoolsPassword,
  FormtoolsSelect
} from './components'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'

import { IoMdPerson } from "react-icons/io"

interface UserLogin {
  email: string,
  password: string,
  favoriteFood: string
}

export default function App() {
  const methods = useForm<UserLogin>()

  const getFoods = async function () {
    return [
      { label: 'Sorvete', value: 'ice-cream' },
      { label: 'Hamburguer', value: 'hamburguer' },
      { label: 'Suco', value: 'juice' },
    ]
  }
  const promiseFoods = function () {
    return new Promise(resolve => {
      setTimeout(()=>{
          resolve(getFoods)
          console.log('carregou')
        }, 5000)
    })
  }

  const handleSubmit: SubmitHandler<UserLogin> = (data: UserLogin) => {
    console.log(data)
  }

  return <div className="App">
    <FormtoolsForm onSubmit={methods.handleSubmit(handleSubmit)} methods={methods}>
      <FormtoolsInput
        label="Email: "
        type="email"
        name="email"
        help="Digite seu email"
        validation={{ required: true }}

        beforeicon={<IoMdPerson/>}
        aftericon={<IoMdPerson/>}
      />

      <FormtoolsPassword
        label="Senha: "
        name="password"
        help="Digite sua senha"
        validation={{ required: true }}
      />

      <FormtoolsSelect
        label="Comida Favorita: "
        name="favoriteFood"
        help="Selecione sua comida favorita"
        asyncLoad={promiseFoods}
        // options={[
        //   { label: 'Sorvete', value: 'ice-cream' },
        //   { label: 'Hamburguer', value: 'hamburguer' },
        //   { label: 'Suco', value: 'juice' },
        // ]}
      />

      <button type="submit">ENVIAR</button>
    </FormtoolsForm>
  </div>
}
