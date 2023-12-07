import { SchemaProps } from '../types/schema'
import { filterProperties } from '../utils/functions'
import {
	FormtoolsInput,
	FormtoolsPassword,
	FormtoolsSelect,
	FormtoolsSearch,
	FormtoolsCheckbox,
	FormtoolsRadio,
	FormtoolsToggle,
	FormtoolsFile,
	FormtoolsTaglist,
	FormtoolsGroup
} from '.'

export function FormtoolsSchema(props: SchemaProps) {
	const inputTypes = [
		'email',
		"text",
		"number",
		"range",
		"date",
		"time",
		"color",
		"submit",
		"reset",
		"button",
		"email",
		"tel",
	]

	const inputs = {
		password: (schema, key) => <FormtoolsPassword {...schema} key={key}/>,
		search: (schema, key) => <FormtoolsSearch {...schema} key={key} />,
		select: (schema, key) => <FormtoolsSelect {...schema} key={key} />,
		checkbox: (schema, key) => <FormtoolsCheckbox {...schema} key={key} />,
		radio: (schema, key) => <FormtoolsRadio {...schema} key={key} />,
		toggle: (schema, key) => <FormtoolsToggle {...schema} key={key} />,
		file: (schema, key) => <FormtoolsFile {...schema} key={key} />,
		taglist: (schema, key) => <FormtoolsTaglist {...schema} key={key} />,
		group: (schema, key) => <FormtoolsGroup title={schema.title} key={key}>
			<FormtoolsSchema
				schema={schema.children}
			/>
		</FormtoolsGroup>
	}

	return <>
		{props.schema.map((schema, idx) => {
			if (inputTypes.indexOf(schema.formtool)!==-1) {
				return <FormtoolsInput {...schema} type={schema.formtool} key={idx} />
			} else if (Object.keys(inputs).indexOf(schema.formtool)!==-1) {
				return inputs[schema.formtool](schema, idx)
			}
		})}
	</>
}
