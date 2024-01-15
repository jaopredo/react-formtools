import { forwardRef, useState } from 'react'
import { InputProps } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'
import { useConfigContextProvider } from '../context/config'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"

export const FormtoolsPassword = forwardRef<HTMLInputElement, InputProps>(function (props, ref) {
	const [ show, setShow ] = useState<boolean>(false)
	const { register } = useFormContext()
	const { themes } = useConfigContextProvider()
	function onPasswordIconClick() {
		setShow(!show)
	}

	return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon}
		aftericon={
			show?<IoMdEye onClick={onPasswordIconClick}/>:<IoMdEyeOff onClick={onPasswordIconClick}/>
		}
	>
		<input {...props} {...register(props.name, props.validation)} type={show?'text':'password'} className={'formtools-input ' + themes.input} />
	</Wrapper>
})
