import { FormProvider, FieldValues, useForm } from 'react-hook-form'
import type { FormtoolsFormProps } from '../types/form'
import { useEffect } from 'react'

export function FormtoolsForm<T extends FieldValues>({ children, onSubmit, setMethods }: FormtoolsFormProps<T>) {
	const methods = useForm<T>()

	useEffect(() => {
		if (setMethods) {
			setMethods(methods)
		}
	}, [])

	return <FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			{ children }
		</form>
	</FormProvider>
}