import React from 'react'

export function FormtoolsGroup({ title, children }: {
	title?: string,
	children: React.ReactNode
}) {
	return <fieldset className={'formtools-group'}>
		{ title && <legend className={'formtools-group-title'}>{title}</legend> }
		{ children }
	</fieldset>
}
