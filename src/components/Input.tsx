import { forwardRef } from 'react'
import { InputProps } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'

export const FormtoolsInput = forwardRef<HTMLInputElement, InputProps>(function (props, ref) {
	const { register } = useFormContext()

	return <Wrapper name={props.name} label={props.label} help={props.help} AfterIcon={props.AfterIcon} BeforeIcon={props.BeforeIcon}>
		<input {...props} {...register(props.name, props.validation)} />
	</Wrapper>
})
