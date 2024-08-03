import type { ReactNode } from 'react'
// import type { SubmitHandler, FieldValues, UseFormReturn } from 'react-hook-form'

export type FormtoolsFormProps<T> = {
	children?: ReactNode | ReactNode[]
	setMethods?: Function
	className?: string
} & ({
	multipart: true
	onSubmit: (data: FormData) => void
} | {
	multipart: false
	onSubmit: (data: T) => void
})
