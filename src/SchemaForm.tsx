import { FormtoolsForm, FormtoolsSchema } from './components'
import { SchemaType } from './types/schema'

import { IoDocumentOutline } from "react-icons/io5"

const schema: SchemaType[] = [
	{
		formtool: 'mask',
		name: 'cpf',
		label: 'Digite seu cpf',
		help: 'Digite seu cpf por favor',
		placeholder: '000.000.000-00',
		mask: '000.000.000-00',
	},
	{
		formtool: 'group',
		title: 'login',
		schema: [
			{
				formtool: 'email',
				name: 'email',
				label: 'Email: ',
				help: 'Digite o seu email',
				validation: {
					required: {
						value: true,
						message: 'Digite seu email, cara!'
					},
				}
			},
			{
				formtool: 'password',
				name: 'password',
				label: 'Senha: ',
				help: 'Digite sua senha',
				validation: {
					required: true,
					minLength: {
						message: 'Sua senha é muito curta',
						value: 8
					}
				}
			},
		]
	},

	{
		formtool: 'search',
        name: "products",
		label: "Produto Favorito: ",
        placeholder: "Selecione aqui o produto",
        help: "Selecione seu produto favorito",
        url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
        multiple: true,
        filterSchema: (value: string) => ({ product_type: value }),

        mapper: (data: any) => data.map((entry: any) => ({ label: entry.name, value: entry.id }))
	},

	{
		formtool: 'select',
    	name: "favoriteFood",
		label: "Comida Favorita: ",
        placeholder: "Selecione aqui a sua comida",
        help: "Selecione sua comida favorita",
        asyncLoad: function () {
		    return new Promise(resolve => {
	    		setTimeout(()=>{
	      			resolve(async () => [
		    			{ label: 'Sorvete', value: 'ice-cream' },
		    			{ label: 'Hamburguer', value: 'hamburguer' },
		    			{ label: 'Suco', value: 'juice' },
		    		])
	        	}, 5000)
		    })
	  	}
        // options={[
        //   { label: 'Sorvete', value: 'ice-cream' },
        //   { label: 'Hamburguer', value: 'hamburguer' },
        //   { label: 'Suco', value: 'juice' },
        // ]}
	},

	{
		formtool: 'checkbox',
		name: "terms",
		label: "Termos e condições de uso: ",
        help: "Aceite os termos de condição de usuário",
        placeholder: "Clique ao lado para aceitar os termos e condições de usuário"
	},

	{
		formtool: 'checkbox',
		name: "orders",
		label: "Selecione os temperos: ",
        help: "Escolha os temperos da pizza",
        options: [
          { label: 'Pepperoni', value: 'pepperoni' },
          { label: 'Queijo', value: 'cheese' },
          { label: 'Carne de sol', value: 'goat-meat' },
          { label: 'Chocolate', value: 'chocolate' }
        ]
	},

	{
		formtool: 'radio',
		label: "Escolha uma das opções",
        help: "Qual é o melhor?",
        name: "best",
        options: [
          { label: 'Goku', value: 'goku' },
          { label: 'Naruto', value: 'naruto' },
        ]
	},

	{
		formtool: 'toggle',
		label: "Ligar tema escuro",
        help: "Aperte para ligar o tema escuro",
        name: "theme",
        toggled: true,
        turnedOffValue: "light",
        turnedOnValue: "dark",
        placeholder: "Tema Escuro",
	},

	{
		formtool: 'file',
		label: "Imagem sua",
        placeholder: "Selecione uma foto",
        help: "Envie uma foto sua",
        name: "image",
		aftericon: <IoDocumentOutline/>,
		multiple: true,
	},

	{
		formtool: 'taglist',
		label: "Matérias preferidas",
        placeholder: "Selecione as matérias",
        help: "Selecione as matérias favoritas",
        name: "favoriteClasses",

        type: "options",
        options: [
          { label: 'Matemática', value: 'math' },
          { label: 'Química', value: 'chimestry' },
          { label: 'Física', value: 'physis' },
          { label: 'Biologia', value: 'biology' },
          { label: 'História', value: 'history' },
        ],
        // asyncLoad: function () {
		//     return new Promise(resolve => {
		//       	setTimeout(()=>{
		//       		resolve(async () => [
		// 				{ label: 'Matemática', value: 'math' },
		// 				{ label: 'Química', value: 'chimestry' },
		// 				{ label: 'Física', value: 'physis' },
		// 				{ label: 'Biologia', value: 'biology' },
		// 				{ label: 'História', value: 'history' },
		// 		    ])
		//         }, 5000)
		//     })
	  	// }
	}
]

interface UserLogin {
	cpf: string,

	email: string,
	password: string,
	
	// product: number,
	products: number[],

	terms: boolean,
	orders: string[],

	best: string,
	theme: boolean,

	image: File,

	favoriteClasses: string[]
}

export default function SchemaForm() {
	const onSubmit = (data: UserLogin|FormData) => {
		console.log(data)
	}

	return <FormtoolsForm onSubmit={onSubmit}>
		<FormtoolsSchema
			schema={schema}
		/>

		<button type="submit">ENVIAR</button>
	</FormtoolsForm >
}
