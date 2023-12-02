import { HTMLProps, ReactNode, ReactElement } from 'react'
import type { RegisterOptions, FieldValues } from 'react-hook-form'

export type WrapperProps = {
	children: ReactNode,
	name: string,
	label: string,
	help?: string,
	BeforeIcon?: ReactElement,
	AfterIcon?: ReactElement,
}

export interface InputProps extends HTMLProps<HTMLInputElement> {
	label: string,
	validation?: RegisterOptions<FieldValues, string>,
	name: string,
	help?: string,
	BeforeIcon?: ReactElement,
	AfterIcon?: ReactElement,
}
