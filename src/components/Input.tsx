import React, { forwardRef } from 'react'
import { InputProps } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'

import { getWrapperProperties, removeWrapperProperties } from '../utils/components'

export const FormtoolsInput = forwardRef<HTMLInputElement, InputProps>(function (props, ref) {
	const { register } = useFormContext()

	return <Wrapper {...getWrapperProperties<InputProps>(props)}>
		<input {...removeWrapperProperties(props)} {...register(props.name, props.validation)} className={`formtools-input ${props.className}`} />
	</Wrapper>
})
