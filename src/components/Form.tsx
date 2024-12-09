import { FormProvider, FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import type { FormtoolsFormProps } from '../types/form'
import React, { useEffect } from 'react'

export function FormtoolsForm<T extends FieldValues>({ children, onSubmit, setMethods, multipart, className }: FormtoolsFormProps<T>) {
	const methods = useForm<T>()  // Retrieving the methdos from useForm values

	useEffect(() => {
		if (setMethods) {  // If the user passed a setState for setMethods, I'll pass it back to him
			setMethods(methods)
		}
	}, [])

	const beforeSubmit: SubmitHandler<T> = (data) => {  // Function executed before submiting the form
		if (multipart) {  // If it is a multipartform
			const formdata = new FormData
			Object.keys(data).forEach(field => {
				formdata.append(field, data[field])
			})
			onSubmit(formdata)  // Pass a FormData as parameter from the passed function
		} else {  // Else
			onSubmit(data)  // Pass the JSON data
		}
	}

	return <FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(beforeSubmit)} className={className}>
			{ children }
		</form>
	</FormProvider>
}