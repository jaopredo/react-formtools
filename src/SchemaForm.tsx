import {
	FormtoolsForm,
	FormtoolsCheckbox
} from './components'

interface UserLogin {
	// cpf: string,

	// email: string,
	// password: string,
	'licence-terms': boolean,
	'best': {
		[x: string]: boolean
	}
}

export default function SchemaForm() {
	const onSubmit = (data: UserLogin|FormData) => {
		console.log(data)
	}

	return <FormtoolsForm<UserLogin> onSubmit={onSubmit}>
		<FormtoolsCheckbox
			label="Termos e Condições"
			name='licence-terms'
			placeholder='Eu li e aceito os termos e condições'
		/>
		<FormtoolsCheckbox
			label='Escolha o melhor'
			name='best'
			options={[
				{ label: 'Naruto', value: 'naruto' },
				{ label: 'Sasuke', value: 'sasuke' },
				{ label: 'Luffy', value: 'luffy' }
			]}
		/>

		<button type="submit">ENVIAR</button>
	</FormtoolsForm >
}
