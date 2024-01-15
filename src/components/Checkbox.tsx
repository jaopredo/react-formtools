import { Children } from 'react'
import Wrapper from './generic/Wrapper'
import { CheckboxProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import { useConfigContextProvider } from '../context/config'

export function FormtoolsCheckbox(props: CheckboxProps) {
	const { register } = useFormContext()
	const { themes } = useConfigContextProvider()

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		{ !props.options && <>
			<input className={'formtools-checkbox ' + themes.checkbox} type="checkbox" {...register(props.name, props.validation)} id={props.name} />
			<label className={'formtools-checkbox-label ' + themes['checkbox-label']} htmlFor={props.name}>{props.placeholder}</label>
		</> }
		{ props.options && <ul className={'formtools-checkbox-list ' + themes['checkbox-list']}>
			{ Children.toArray(props.options.map(opt => <li className={'formtools-checkbox-item ' + themes['checkbox-item']}>
				<label className={'formtools-checkbox-label ' + themes['checkbox-label']} htmlFor={opt.value}>{opt.label}</label>
				<input className={'formtools-checkbox ' + themes.checkbox} id={opt.value} type="checkbox" value={opt.value} {...register(props.name, props.validation)} />
			</li>)) }
		</ul> }
	</Wrapper>
}
