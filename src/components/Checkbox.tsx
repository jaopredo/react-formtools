import React, { Children } from 'react'
import Wrapper from './generic/Wrapper'
import { CheckboxProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'

import { getWrapperProperties, removeWrapperProperties } from '../utils/components'

export function FormtoolsCheckbox(props: CheckboxProps) {
	const { register } = useFormContext()

	return <Wrapper {...getWrapperProperties<CheckboxProps>(props)}>
		{ !props.options && <>
			<input className={`formtools-checkbox ${props.className || ''}`} type="checkbox" {...register(props.name, props.validation)} id={props.name} {...removeWrapperProperties(props)} />
			<label className={`formtools-checkbox-label ${props.labelClassName || ''}`} htmlFor={props.name}>{props.placeholder}</label>
		</> }
		{ props.options && <ul className={`formtools-checkbox-list`}>
			{ Children.toArray(props.options.map(opt => <li className={`formtools-checkbox-item ${props.itemClassName || ''}`}>
				<label className={`formtools-checkbox-label ${props.labelClassName || ''}`} htmlFor={opt.value}>{opt.label}</label>
				<input className={`formtools-checkbox ${props.className || ''}`} id={opt.value} type="checkbox" value={opt.value} {...register(props.name, props.validation)} {...removeWrapperProperties(props)} />
			</li>)) }
		</ul> }
	</Wrapper>
}
