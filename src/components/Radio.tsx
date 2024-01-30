import Wrapper from './generic/Wrapper'
import React, { Children, useState, useEffect, MouseEvent } from 'react'
import { RadioProps, ToggleProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

export function FormtoolsRadio(props: RadioProps) {
	const { register } = useFormContext()

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		<ul className={'formtools-radio-list'}>
			{Children.toArray(props.options.map(opt => <li className={'formtools-radio-item'}>
				<label className={'formtools-radio-label'} htmlFor={opt.value}>{opt.label}</label>
				<input className={'formtools-radio'} type="radio" {...register(props.name, props.validation)} id={opt.value} value={opt.value}/>
			</li>))}
		</ul>
	</Wrapper>
}


const Toggle = styled.div<{ isTurnedOn: boolean }>`
	width: 40px;
	height: 20px;
	border-radius: 30px;
	background-color: ${props => props.isTurnedOn?'#8b8b8b':'#009ec5'};
	position: relative;
	
	&:hover {
		cursor: pointer;
	}

	&::after {
		content: '';
		width: 20px;
		height: 20px;
		background-color: #ececec;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: ${props => props.isTurnedOn?'0':'auto'};
		right: ${props => props.isTurnedOn?'auto':'0'};
	}
`

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
			} else {
				setValue(props.name, props.turnedOnValue)
			}
		} else {
			setValue(props.name, !toggled)
		}
		setToggled(!toggled)
	}

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		<Toggle
			isTurnedOn={toggled}
			onClick={handleToggle}
			className={'formtools-toggle'}
		/> <label className={'formtools-toggle-label'} onClick={handleToggle} htmlFor={props.name}>{props.placeholder}</label>
	</Wrapper>
}
