import React, { Children } from 'react'
import Wrapper from './generic/Wrapper'
import { CheckboxProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'

import { getWrapperProperties } from '../utils/components'

export function FormtoolsCheckbox(props: CheckboxProps) {
	const { register } = useFormContext()

	return <Wrapper {...getWrapperProperties<CheckboxProps>(props)}>
		{ !props.options && <>
			<input className={'formtools-checkbox'} type="checkbox" {...register(props.name, props.validation)} id={props.name} />
			<label className={'formtools-checkbox-label'} htmlFor={props.name}>{props.placeholder}</label>
		</> }
		{ props.options && <ul className={'formtools-checkbox-list'}>
			{ Children.toArray(props.options.map(opt => <li className={'formtools-checkbox-item'}>
				<label className={'formtools-checkbox-label'} htmlFor={opt.value}>{opt.label}</label>
				<input className={'formtools-checkbox'} id={opt.value} type="checkbox" value={opt.value} {...register(props.name, props.validation)} />
			</li>)) }
		</ul> }
	</Wrapper>
}
