import { forwardRef, useState } from 'react'
import { PasswordProps } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'
import { useConfigContextProvider } from '../context/config'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"

export const FormtoolsPassword = forwardRef<HTMLInputElement, PasswordProps>(function (props, ref) {
	const [ show, setShow ] = useState<boolean>(false)
	const { register } = useFormContext()
	const { themes } = useConfigContextProvider()
	function onPasswordIconClick() {
		setShow(!show)
	}

	return <Wrapper family='password' name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon}
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
		<input {...props} {...register(props.name, props.validation)} type={show?'text':'password'} className={'formtools-input ' + themes.input} />
	</Wrapper>
})
