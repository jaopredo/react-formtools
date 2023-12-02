import { FormProvider, FieldValues } from 'react-hook-form'
import type { FormtoolsFormProps } from '../types/form'

export function FormtoolsForm({ children, onSubmit, methods }: FormtoolsFormProps) {
	return <FormProvider {...methods}>
		<form onSubmit={onSubmit}>
			{ children }
		</form>
	</FormProvider>
}