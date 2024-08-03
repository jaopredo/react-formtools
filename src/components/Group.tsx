import React from 'react'
import { GroupProps } from '../types/inputs'

export function FormtoolsGroup({ title, children, titleClassName, className, ...rest }: GroupProps) {
	return <fieldset className={'formtools-group' + ` ${className || ''}`} {...rest}>
		{ title && <legend className={'formtools-group-title' + ` ${titleClassName}`}>{title}</legend> }
		{ children }
	</fieldset>
}
