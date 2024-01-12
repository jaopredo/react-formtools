import Wrapper from './generic/Wrapper'
import { Children, useState, useEffect, MouseEvent } from 'react'
import { RadioProps, ToggleProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'

export function FormtoolsRadio(props: RadioProps) {
	const { register } = useFormContext()

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		{Children.toArray(props.options.map(opt => <li>
			<label htmlFor={opt.value}>{opt.label}</label>
			<input type="radio" {...register(props.name, props.validation)} id={opt.value} value={opt.value}/>
		</li>))}
	</Wrapper>
}


export function FormtoolsToggle(props: ToggleProps) {
	const { setValue } = useFormContext()
	const [ toggled, setToggled ] = useState<any>(props.toggled?(props.turnedOnValue||true):(props.turnedOffValue||false))  // Diz se está ligado ou não

	useEffect(() => {
		setValue(props.name, toggled)
	}, [])

	function handleToggle(e: MouseEvent<HTMLDivElement|HTMLLabelElement>) {
		if (props.onClick) {
			props.onClick(e as MouseEvent<HTMLInputElement>)
		}
		if (props.turnedOnValue && props.turnedOffValue) {
			if (toggled == props.turnedOnValue) {
				setValue(props.name, props.turnedOffValue)
				setToggled(props.turnedOffValue)
			} else {
				setValue(props.name, props.turnedOnValue)
				setToggled(props.turnedOnValue)
			}
		} else {
			setValue(props.name, !toggled)
			setToggled(!toggled)
		}
	}

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		<div onClick={handleToggle} style={{
			width: '50px',
			height: '50px',
			backgroundColor: (toggled==props.turnedOnValue) || (typeof toggled == 'boolean' && toggled)?'green':'red',
			borderRadius: '50%'
		}} id={props.name}></div> <label onClick={handleToggle} htmlFor={props.name}>{props.placeholder}</label>
	</Wrapper>
}
