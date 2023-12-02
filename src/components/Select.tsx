import { forwardRef, useState, MutableRefObject, Children } from 'react'
import { SelectProps } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext } from 'react-hook-form'
import { IoIosArrowDown } from "react-icons/io"

export function FormtoolsSelect (props: SelectProps) {
	const { register, setValue } = useFormContext()
	const [ showDropdown, setShowDropdown ] = useState<boolean>(false)
	const [ inputLabel, setInputLabel ] = useState<string>('')

	const handleClickSelect = () => setShowDropdown(!showDropdown)
	const handleClickOption = (label: string, value: string) => {
		setInputLabel(label)
		setValue(props.name, value)
	}

	return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon}
	aftericon={<IoIosArrowDown onClick={handleClickSelect}/>}>
		<input value={inputLabel} readOnly {...register(props.name, props.validation)} onClick={handleClickSelect}/>
		{showDropdown && <ul>
			{Children.toArray(props.options.map(opt => <li onClick={() => handleClickOption(opt.label, opt.value)}>{opt.label}</li>))}
			{props.children}
		</ul>}
	</Wrapper>
}
