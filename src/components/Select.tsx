import React, { useState, Children, useEffect} from 'react'
import { SelectProps, OptionType } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'
import { IoIosArrowDown } from "react-icons/io"

import { getWrapperProperties, removeWrapperProperties } from '../utils/components'

export function FormtoolsSelect (props: SelectProps) {
	const { register, setValue } = useFormContext()
	const [ showDropdown, setShowDropdown ] = useState<boolean>(false)
	const [ inputLabel, setInputLabel ] = useState<string>('')

	const [ options, setOptions ] = useState<OptionType[]|undefined>(props.type == 'options' ? props.options : [])

	const handleClickSelect = () => setShowDropdown(!showDropdown)
	const handleClickOption = (label: string, value: string) => {
		setInputLabel(label)
		setValue(props.name, value)
	}

	useEffect(() => {
		if (props.type == 'async') {
			props.asyncLoad().then(resp => setOptions(resp))
		}
	}, [])

	return <Wrapper {...getWrapperProperties(props)}
	aftericon={<IoIosArrowDown onClick={handleClickSelect}/>}>
		<input className={`formtools-input ${props.className||''}`} placeholder={props.placeholder} value={inputLabel} readOnly {...register(props.name, props.validation)} onClick={handleClickSelect}/>
		{showDropdown && <ul className={`formtools-select-options ${props.selectOptionsClassName||''}`}>
			{
				options && Children.toArray(options?.map(opt =>
					<li
						className={`formtools-select-option ${props.selectOptionClassName||''}`}
						onClick={() => handleClickOption(opt.label, opt.value)}
					>{opt.label}</li>)
				)
			}
			{!options && <p className={`formtools-select-load ${props.selectLoadClassName||''}`}>Carregando...</p>}
			{props.children}
		</ul>}
	</Wrapper>
}
