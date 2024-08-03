import React, { useState } from 'react'
import { PasswordProps } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"

import { getWrapperProperties, removeWrapperProperties } from '../utils/components'

export function FormtoolsPassword(props: PasswordProps) {
	const [ show, setShow ] = useState<boolean>(false)
	const { register } = useFormContext()
	function onPasswordIconClick() {
		setShow(!show)
	}

	return <Wrapper {...getWrapperProperties(props)}
		aftericon={
			show?(
				props.stateshowicon?
					props.stateshowicon({ onClick: onPasswordIconClick }):
					<IoMdEye onClick={onPasswordIconClick}/>
				):(
				props.statehideicon?
					props.statehideicon({ onClick: onPasswordIconClick }):
					<IoMdEyeOff onClick={onPasswordIconClick}/>
			)
		}
	>
		<input {...removeWrapperProperties(props)} {...register(props.name, props.validation)} type={show?'text':'password'} className={`formtools-input ${props.className||''}`} />
	</Wrapper>
}
