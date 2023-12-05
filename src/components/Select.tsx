import { forwardRef, useState, MutableRefObject, Children, useEffect} from 'react'
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
			props.asyncLoad().then(resp => resp().then((r: OptionType[]) => setOptions(r)))
		}
	}, [])

	return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon}
	aftericon={<IoIosArrowDown onClick={handleClickSelect}/>}>
		<input value={inputLabel} readOnly {...register(props.name, props.validation)} onClick={handleClickSelect}/>
		{showDropdown && <ul>
			{options && Children.toArray(options?.map(opt => <li onClick={() => handleClickOption(opt.label, opt.value)}>{opt.label}</li>))}
			{!options && <p>Carregando...</p>}
			{props.children}
		</ul>}
	</Wrapper>
}
