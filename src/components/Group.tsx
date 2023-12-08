
export function FormtoolsGroup({ title, children }: {
	title?: string,
	children: React.ReactNode
}) {
	return <fieldset>
		{ title && <legend>{title}</legend> }
		{children}
	</fieldset>
}
