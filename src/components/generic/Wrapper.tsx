import { useEffect, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { WrapperProps } from '../../types/inputs'

export default function Wrapper({children, label, name, help, BeforeIcon, AfterIcon}: WrapperProps) {
	const { formState: { errors } } = useFormContext()

	return <div className="formtools-container">
		<label htmlFor={name}>{ label }</label>
		<div className="formtools-insider">
			{BeforeIcon && <div className="formtools-before-icon">
				{BeforeIcon}
			</div>}
			{children}
			{AfterIcon && <div className="formtools-after-icon">
				{AfterIcon}
			</div>}
		</div>
		{help && <p className="formtools-help">{ help }</p>}
		{errors[name] && <p className="formtools-errors">{errors[name]?.message as string}</p>}
	</div>
}
