import { HTMLProps, ReactNode, ReactElement } from 'react'
import type { RegisterOptions, FieldValues } from 'react-hook-form'

interface DefaultProps {
	name: string,
	label: string,
	help?: string,
	beforeicon?: ReactElement,
	aftericon?: ReactElement,
}


export interface WrapperProps extends DefaultProps {
	children: ReactNode,
}

export interface InputProps extends DefaultProps, Omit<HTMLProps<HTMLInputElement>, keyof DefaultProps> {
	validation?: RegisterOptions<FieldValues, string>,
}


export interface SelectProps extends DefaultProps, Omit<HTMLProps<HTMLSelectElement>, keyof DefaultProps> {
	children?: ReactNode,
	validation?: RegisterOptions<FieldValues, string>,
	options?: {
		label: string,
		value: any
	}[],
	asyncLoad?: () => Promise<any>
}
