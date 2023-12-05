import { Children } from 'react'
import Wrapper from './generic/Wrapper'
import { CheckboxProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'

export function FormtoolsCheckbox(props: CheckboxProps) {
	const { register } = useFormContext()

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		{ !props.options && <input type="checkbox" {...register(props.name, props.validation)} /> }
		{ props.options && <ul>
			{ Children.toArray(props.options.map(opt => <li>
				<label htmlFor={opt.value}>{opt.label}</label>
				<input id={opt.value} type="checkbox" value={opt.value} {...register(props.name, props.validation)} />
			</li>)) }
		</ul> }
	</Wrapper>
}
