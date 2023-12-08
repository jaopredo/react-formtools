import { DefaultProps } from './input'

export interface SchemaProps {
	data: Array<
		DefaultProps & { [x: string]: any }
	>
}
