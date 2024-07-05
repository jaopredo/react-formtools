import type { HTMLProps, ReactNode, ReactElement } from 'react'
import type { RegisterOptions, FieldValues } from 'react-hook-form'
import { ReactMaskProps } from 'react-imask'

// import { 
//     InputMask,
//     IMaskMixinProps,
//     ReactMaskOpts,
//     FactoryOpts,
//     ReactMaskProps
//  } from 'react-imask'


export interface DefaultProps {
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


export type InputProps = DefaultProps & OmitedProps<HTMLInputElement>

export interface PasswordProps extends Omit<DefaultProps, 'aftericon'> {
	stateshowicon: Function,
	statehideicon: Function
}

export type OptionType = {
	label: string,
	value: any
}

export type SelectProps = Omit<DefaultProps, 'aftericon'> & OmitedProps<HTMLSelectElement> & ({
	options: OptionType[]
} | {
	asyncLoad: () => Promise<any>
})


export interface SearchProps extends Omit<DefaultProps, 'aftericon'>, OmitedProps<HTMLSelectElement> {
	url: string,
	filterSchema: (value: any) => string | string[][] | Record<string, string> | URLSearchParams | undefined,
	mapper?: (data: any) => OptionType[],
	multiple?: boolean
}


export interface CheckboxProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options?: OptionType[]
}


export interface RadioProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options: OptionType[]
}

export interface ToggleProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	toggled?: boolean,

	turnedOffValue?: any,
	turnedOnValue?: any
}


export interface FileProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	multiple?: boolean
}


export type TaglistProps = Omit<DefaultProps, 'aftericon'> & OmitedProps<HTMLInputElement> & ({
	type: 'options'
	options: OptionType[]
} | {
    type: 'async'
	asyncLoad: () => Promise<any>
} | {
    type: 'typing'
})


export interface MaskProps extends ReactMaskProps<HTMLInputElement>, DefaultProps {
    mask: string
}
