import { useFormContext } from 'react-hook-form'
import { WrapperProps } from '../../types/inputs'
import { useConfigContextProvider } from '../../context/config'

export default function Wrapper({children, label, name, help, beforeicon, aftericon}: WrapperProps) {
	const { formState: { errors } } = useFormContext()
	const { themes } = useConfigContextProvider()

	return <div className={'formtools-container ' + themes.container}>
		<label className={'formtools-label ' + themes.label} htmlFor={name}>{ label }</label>
		<div className={'formtools-insider ' + themes.insider}>
			{beforeicon && <div className={'formtools-before-icon ' + themes['before-icon']}>
				{beforeicon}
			</div>}
			{children}
			{aftericon && <div className={'formtools-after-icon ' + themes['after-icon']}>
				{aftericon}
			</div>}
		</div>
		{help && <p className={'formtools-help ' + themes.help}>{ help }</p>}
		{errors[name] && <p className={'formtools-errors ' + themes.errors}>{errors[name]?.message as string}</p>}
	</div>
}
