import React from 'react'
import { HTMLProps } from 'react'

export function FormtoolsGroup({ title, children, titleclassname, ...rest }: {
	title?: string,

    titleclassname?: string
} & HTMLProps<HTMLFieldSetElement>) {
	return <fieldset className={'formtools-group' + ` ${rest.className || ''}`} {...rest}>
		{ title && <legend className={'formtools-group-title' + ` ${titleclassname}`}>{title}</legend> }
		{ children }
	</fieldset>
}
