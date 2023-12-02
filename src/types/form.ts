import type { ReactNode } from 'react'
import type { SubmitHandler, FieldValues, UseFormReturn } from 'react-hook-form'

export interface FormtoolsFormProps {
	children?: ReactNode | ReactNode[],
	onSubmit: SubmitHandler<any>
	methods: UseFormReturn<any>
}
