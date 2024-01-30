import { FormProvider, FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import type { FormtoolsFormProps } from '../types/form'
import React, { useEffect } from 'react'

export function FormtoolsForm<T extends FieldValues>({ children, onSubmit, setMethods, multipart }: FormtoolsFormProps<T>) {
	const methods = useForm<T>()

	useEffect(() => {
		if (setMethods) {
			setMethods(methods)
		}
	}, [])

	const beforeSubmit: SubmitHandler<T> = (data) => {
		if (multipart) {
			const formdata = new FormData
			Object.keys(data).forEach(field => {
				formdata.append(field, data[field])
			})
			onSubmit(formdata)
		} else {
			onSubmit(data)
		}
	}

	return <FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(beforeSubmit)}>
			{ children }
		</form>
	</FormProvider>
}