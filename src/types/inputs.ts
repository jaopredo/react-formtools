import { HTMLProps, ReactNode, ReactElement } from 'react'
import type { RegisterOptions, FieldValues } from 'react-hook-form'


interface DefaultProps {
	name: string,
	label: string,
	help?: string,
	beforeicon?: ReactElement,
	aftericon?: ReactElement,
	validation?: RegisterOptions<FieldValues, string>,
}
type OmitedProps<T> = Omit<HTMLProps<T>, keyof DefaultProps>

export interface WrapperProps extends DefaultProps {
	children: ReactNode,
}


export interface InputProps extends DefaultProps, OmitedProps<HTMLInputElement> {
}


export type OptionType = {
	label: string,
	value: any
}

export interface SelectProps extends DefaultProps, OmitedProps<HTMLSelectElement> {
	options?: OptionType[],
	asyncLoad?: () => Promise<any>
}


export interface SearchProps extends DefaultProps, OmitedProps<HTMLSelectElement> {
	url: string,
	filterSchema: (value: any) => string | string[][] | Record<string, string> | URLSearchParams | undefined,
	mapper?: (data: any) => OptionType[],
	multiple?: boolean
}


export interface CheckboxProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options?: OptionType[]
}
