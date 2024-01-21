import { SchemaProps } from '../types/schema'
import { Children } from 'react'
import {
	FormtoolsInput
} from '.'
import { useConfigContextProvider } from '../context/config'
export function FormtoolsSchema(props: SchemaProps) {
	const { components, inputTypes, customComponents } = useConfigContextProvider()

	return <>
		{Children.toArray(props.schema.map((schema) => {
			if (inputTypes?.indexOf(schema.formtool)!==-1) {
				return <FormtoolsInput {...schema as any} type={schema.formtool}/>
			} else if (Object.keys(components as keyof typeof components).indexOf(schema.formtool)!==-1) {
				return components?.[schema.formtool as keyof typeof components](schema)
			} else {
				return customComponents?.[schema.formtool](schema)
			}
		}))}
	</>
}
