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

    // Propriedades de className
    containerClassName?: string
    labelClassName?: string
    insiderClassName?: string
    afterIconClassName?: string
    beforeIconClassName?: string
    helpClassName?: string
    errorClassName?: string
}
type OmitedProps<T> = Omit<HTMLProps<T>, keyof DefaultProps>

export interface WrapperProps extends DefaultProps {
	children: ReactNode,
}


export type InputProps = DefaultProps & OmitedProps<HTMLInputElement>

export interface PasswordProps extends Omit<DefaultProps, 'aftericon'>, OmitedProps<HTMLInputElement> {
	stateshowicon: Function,
	statehideicon: Function
}

export type OptionType = {
	label: string,
	value: any
}

export type SelectProps = Omit<DefaultProps, 'aftericon'> & OmitedProps<HTMLSelectElement> & {
    selectOptionsClassName?: string
    selectOptionClassName?: string
    selectLoadClassName?: string
} & ({
    type: 'options'
	options: OptionType[]
} | {
    type: 'async'
	asyncLoad: () => Promise<any>
})


export interface SearchProps extends Omit<DefaultProps, 'aftericon'>, OmitedProps<HTMLSelectElement> {
	url: string
	filterSchema: (value: any) => string | string[][] | Record<string, string> | URLSearchParams | undefined
	mapper?: (data: any) => OptionType[]
	multiple?: boolean

    searchListClassName?: string
    searchListItemClassName?: string
    searchOptionsClassName?: string
    searchLoadClassName?: string
    searchOptionClassName?: string
}


export interface CheckboxProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options?: OptionType[]

    labelClassName?: string
    itemClassName?: string
}


export interface RadioProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options: OptionType[]

    radioListClassName?: string
    radioListItemClassName?: string
    radioLabelClassName?: string
}

export interface ToggleProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	toggled?: boolean,

	turnedOffValue?: any,
	turnedOnValue?: any

    labelClassName?: string
}


export interface FileProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	multiple?: boolean,

    // Propriedades de Classe
    fileInputClassName?: string,
    fileListClassName?: string,
    fileListItemClassName?: string
}


export type TaglistProps = Omit<DefaultProps, 'aftericon'> & OmitedProps<HTMLInputElement> & {
    addKeys: string

    taglistClassName?: string
    taglistOptionsClassName?: string
    taglistLoadClassName?: string
    taglistTagClassName?: string
    taglistOptionClassName?: string
} & ({
	type: 'options'
	options: OptionType[]
} | {
    type: 'async'
	asyncLoad: () => Promise<any>
} | {
    type: 'typing'
})


export interface MaskProps extends ReactMaskProps<HTMLInputElement>, DefaultProps {
    mask: string,
    className?: string
}


export type GroupProps = {
    title?: string,
    titleClassName?: string
} & HTMLProps<HTMLFieldSetElement>
