import { useEffect, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { WrapperProps } from '../../types/inputs'

export default function Wrapper({children, label, name, help, beforeicon, aftericon}: WrapperProps) {
	const { formState: { errors } } = useFormContext()

	return <div className="formtools-container">
		<label htmlFor={name}>{ label }</label>
		<div className="formtools-insider">
			{beforeicon && <div className="formtools-before-icon">
				{beforeicon}
			</div>}
			{children}
			{aftericon && <div className="formtools-after-icon">
				{aftericon}
			</div>}
		</div>
		{help && <p className="formtools-help">{ help }</p>}
		{errors[name] && <p className="formtools-errors">{errors[name]?.message as string}</p>}
	</div>
}
