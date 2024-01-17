import { useFormContext } from 'react-hook-form'
import { WrapperProps } from '../../types/inputs'
import { useConfigContextProvider } from '../../context/config'

export default function Wrapper({children, label, name, help, beforeicon, aftericon, family}: WrapperProps) {
	const { formState: { errors } } = useFormContext()
	const { themes } = useConfigContextProvider()

	return <div className={`formtools-container ${themes[`${family}:container`]} ${themes.container}`}>
		<label className={`formtools-label ${themes[`${family}:label`]} ${themes.label}`} htmlFor={name}>{ label }</label>
		<div className={`formtools-insider ${themes.insider} ${themes[`${family}:insider`]}`}>
			{beforeicon && <div className={`formtools-before-icon ${themes[`${family}:before-icon`]} ${themes['before-icon']}`}>
				{beforeicon}
			</div>}
			{children}
			{aftericon && <div className={`formtools-after-icon ${themes[`${family}:after-icon`]} ${themes['after-icon']}`}>
				{aftericon}
			</div>}
		</div>
		{help && <p className={`formtools-help ${themes[`${family}:help`]} ${themes.help}`}>{ help }</p>}
		{errors[name] && <p className={`formtools-errors ${themes[`${family}:errors`]} ${themes.errors}`}>{errors[name]?.message as string}</p>}
	</div>
}
