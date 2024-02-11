import React, { useState, Children, useEffect} from 'react'
import { SelectProps, OptionType } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'
import { IoIosArrowDown } from "react-icons/io"

export function FormtoolsSelect (props: SelectProps) {
	const { register, setValue } = useFormContext()
	const [ showDropdown, setShowDropdown ] = useState<boolean>(false)
	const [ inputLabel, setInputLabel ] = useState<string>('')

	const [ options, setOptions ] = useState<OptionType[]|undefined>(props.options)

	const handleClickSelect = () => setShowDropdown(!showDropdown)
	const handleClickOption = (label: string, value: string) => {
		setInputLabel(label)
		setValue(props.name, value)
	}

	useEffect(() => {
		if (props.asyncLoad) {
			props.asyncLoad().then(resp => setOptions(resp))
		}
	}, [])

	return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon}
	aftericon={<IoIosArrowDown onClick={handleClickSelect}/>}>
		<input className={'formtools-input'} placeholder={props.placeholder} value={inputLabel} readOnly {...register(props.name, props.validation)} onClick={handleClickSelect}/>
		{showDropdown && <ul className={'formtools-select-options'}>
			{options && Children.toArray(options?.map(opt => <li className={'formtools-select-option'} onClick={() => handleClickOption(opt.label, opt.value)}>{opt.label}</li>))}
			{!options && <p className={'formtools-select-load'}>Carregando...</p>}
			{props.children}
		</ul>}
	</Wrapper>
}
