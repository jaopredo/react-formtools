import type { ReactNode } from 'react'
// import type { SubmitHandler, FieldValues, UseFormReturn } from 'react-hook-form'

export interface FormtoolsFormProps<T> {
	children?: ReactNode | ReactNode[],
	onSubmit: (data: T|FormData) => void,
	setMethods?: Function,
	multipart?: boolean
	// methods: UseFormReturn<any>
}
