import {
  FormtoolsForm,
  FormtoolsInput,
  FormtoolsPassword,
  FormtoolsSelect,
  FormtoolsSearch,
  FormtoolsCheckbox,
  FormtoolsRadio,
  FormtoolsToggle,
  FormtoolsFile
} from './components'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'

import { IoMdPerson } from "react-icons/io"

interface UserLogin {
  email: string,
  password: string,
  
  product: number,
  products: number[],

  terms: boolean,
  orders: string[],

  best: string,
  theme: boolean,

  image: File
}

export default function App() {
  const [ methods, setMethods ] = useState<UseFormReturn>()

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

  const handleSubmit = (data: UserLogin|FormData) => {
  }

  return <div className="App">
    <FormtoolsForm<UserLogin> onSubmit={handleSubmit} setMethods={setMethods} multipart>
      <FormtoolsInput
        label="Email: "
        type="email"
        name="email"
        help="Digite seu email"
        placeholder="exemplo@dominio.com"

        beforeicon={<IoMdPerson/>}
        aftericon={<IoMdPerson/>}
      />

      <FormtoolsPassword
        label="Senha: "
        name="password"
        help="Digite sua senha"
        placeholder="xxxxxxxx"
        validation={{
          minLength: {
            value: 8,
            message: 'A senha deve conter no mínimo 8 caracteres'
          }
        }}
      />

      <FormtoolsSearch
        label="Produto Favorito: "
        name="product"
        placeholder="Selecione aqui o produto"
        help="Selecione seu produto favorito"
        url='http://makeup-api.herokuapp.com/api/v1/products.json'
        filterSchema={(value) => ({ product_type: value })}

        mapper={(data: any) => data.map((entry: any) => ({ label: entry.name, value: entry.id }))}
      />

      <FormtoolsSearch
        label="Produto favorito (Múltiplo): "
        multiple
        name="products"
        placeholder="uuuuoooooo"
        help="Selecione seus produtos favoritos"
        url='http://makeup-api.herokuapp.com/api/v1/products.json'
        filterSchema={(value) => ({ product_type: value })}

        mapper={(data: any) => data.map((entry: any) => ({ label: entry.name, value: entry.id }))}
      />

      <FormtoolsSelect
        label="Comida Favorita: "
        name="favoriteFood"
        placeholder="Selecione aqui a sua comida"
        help="Selecione sua comida favorita"
        // asyncLoad={promiseFoods}
        options={[
          { label: 'Sorvete', value: 'ice-cream' },
          { label: 'Hamburguer', value: 'hamburguer' },
          { label: 'Suco', value: 'juice' },
        ]}
      />

      <FormtoolsCheckbox
        label="Termos e condições de uso: "
        name="terms"
        help="Aceite os termos de condição de usuário"
        placeholder="Clique ao lado para aceitar os termos e condições de usuário"
      />

      <FormtoolsCheckbox
        label="Escolha os temperos: "
        name="orders"
        help="Selecione os temperos da sua pizza!"
        options={[
          { label: 'Pepperoni', value: 'pepperoni' },
          { label: 'Queijo', value: 'cheese' },
          { label: 'Carne de sol', value: 'goat-meat' },
          { label: 'Chocolate', value: 'chocolate' }
        ]}
      />

      <FormtoolsRadio
        label="Escolha uma das opções"
        help="Qual é o melhor?"
        name="best"
        options={[
          { label: 'Goku', value: 'goku' },
          { label: 'Naruto', value: 'naruto' },
        ]}
      />

      <FormtoolsToggle
        label="Ligar tema escuro"
        help="Aperte para ligar o tema escuro"
        name="theme"
        toggled
        turnedOffValue="light"
        turnedOnValue="dark"
        placeholder="Tema Escuro"
      />

      <FormtoolsFile
        label="Imagem sua"
        placeholder="Selecione uma foto"
        help="Envie uma foto sua"
        name="image"
      />

      <button type="submit">ENVIAR</button>
    </FormtoolsForm>
  </div>
}
