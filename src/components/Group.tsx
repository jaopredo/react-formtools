import { useConfigContextProvider } from "../context/config"

export function FormtoolsGroup({ title, children }: {
	title?: string,
	children: React.ReactNode
}) {
	const { themes } = useConfigContextProvider()
	
	return <fieldset className={'formtools-group ' + themes['group-container']}>
		{ title && <legend className={'formtools-group-title' + themes['group-title']}>{title}</legend> }
		{children}
	</fieldset>
}
