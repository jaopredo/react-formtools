import React from 'react'
import { useFormContext } from 'react-hook-form'
import { WrapperProps } from '../../types/inputs'

export default function Wrapper({
    children,
    label,
    name,
    help,
    beforeicon,
    aftericon,

    containerClassName: containerclassname,
    labelClassName: labelclassname,
    insiderClassName: insiderclassname,
    beforeIconClassName: beforeIconclassname,
    afterIconClassName: afterIconclassname,
    helpClassName: helpclassname,
    errorClassName: errorclassname
}: WrapperProps) {
	const { formState: { errors } } = useFormContext()

	return <div className={`formtools-container ${containerclassname||''}`}>
		<label className={`formtools-label ${labelclassname||''}`} htmlFor={name}>{ label }</label>
		<div className={`formtools-insider ${insiderclassname||''}`}>
			{beforeicon && <div className={`formtools-before-icon ${beforeIconclassname||''}`}>
				{beforeicon}
			</div>}
			{children}
			{aftericon && <div className={`formtools-after-icon ${afterIconclassname||''}`}>
				{aftericon}
			</div>}
		</div>
		{help && <p className={`formtools-help ${helpclassname||''}`}>{ help }</p>}
		{errors[name] && <p className={`formtools-errors ${errorclassname||''}`}>{errors[name]?.message as string}</p>}
	</div>
}
