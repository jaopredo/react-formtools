import { SchemaProps, SchemaType } from '../types/schema'
import {
    InputProps,
    CheckboxProps,
    SelectProps,
    SearchProps,
    MaskProps,
    FileProps,
    RadioProps,
    TaglistProps,
    ToggleProps
} from '../types/inputs'
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
	FormtoolsGroup,
	FormtoolsMask
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
		password: (schema: InputProps, key: number) => <FormtoolsPassword {...schema as any} key={key}/>,
		search: (schema: SearchProps, key: number) => <FormtoolsSearch {...schema} key={key} />,
		select: (schema: SelectProps, key: number) => <FormtoolsSelect {...schema} key={key} />,
		checkbox: (schema: CheckboxProps, key: number) => <FormtoolsCheckbox {...schema} key={key} />,
		radio: (schema: RadioProps, key: number) => <FormtoolsRadio {...schema} key={key} />,
		toggle: (schema: ToggleProps, key: number) => <FormtoolsToggle {...schema} key={key} />,
		file: (schema: FileProps, key: number) => <FormtoolsFile {...schema} key={key} />,
		taglist: (schema: TaglistProps, key: number) => <FormtoolsTaglist {...schema} key={key} />,
		mask: (schema: MaskProps, key: number) => <FormtoolsMask {...schema} key={key}/>,
		group: (schema: {
            title?: string,
            schema: SchemaType[]
        }, key: number) => <FormtoolsGroup title={schema.title} key={key}>
			<FormtoolsSchema
				schema={schema.schema}
			/>
		</FormtoolsGroup>
	}

	return <>
		{props.schema.map((schema, idx) => {
			if (inputTypes.indexOf(schema.formtool)!==-1) {
				return <FormtoolsInput {...schema as any} type={schema.formtool} key={idx} />
			} else if (Object.keys(inputs).indexOf(schema.formtool)!==-1) {
				return inputs[schema.formtool as keyof typeof inputs](
					schema as any,
					idx
				)
			}
			return null
		})}
	</>
}
