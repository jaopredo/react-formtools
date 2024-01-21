import { FormtoolsForm, FormtoolsSchema } from './components'
import { SchemaType } from './types/schema'

import { IoDocumentOutline } from "react-icons/io5"

const schema: SchemaType[] = [
	{
		formtool: 'custominput',
		name: 'cpf',
		teste: 'Apenas um teste',
		label: 'Digite seu cpf',
		help: 'Digite seu cpf por favor',
		placeholder: '000.000.000-00',
		mask: '000.000.000-00',
	},
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

	return <FormtoolsForm<UserLogin> onSubmit={onSubmit}>
		<FormtoolsSchema
			schema={schema}
		/>

		<button type="submit">ENVIAR</button>
	</FormtoolsForm >
}
