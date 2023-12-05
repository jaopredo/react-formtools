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


export interface WrapperProps extends DefaultProps {
	children: ReactNode,
}


export interface InputProps extends DefaultProps, Omit<HTMLProps<HTMLInputElement>, keyof DefaultProps> {
}


export type OptionType = {
	label: string,
	value: any
}

export interface SelectProps extends DefaultProps, Omit<HTMLProps<HTMLSelectElement>, keyof DefaultProps> {
	options?: OptionType[],
	asyncLoad?: () => Promise<any>
}


export interface SearchProps extends DefaultProps, Omit<HTMLProps<HTMLSelectElement>, keyof DefaultProps> {
	url: string,
	filterSchema: (value: any) => string | string[][] | Record<string, string> | URLSearchParams | undefined,
	mapper?: (data: any) => OptionType[],
	multiple?: boolean
}
