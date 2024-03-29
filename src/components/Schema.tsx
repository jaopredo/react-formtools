import { SchemaProps } from '../types/schema'
import React, { Children } from 'react'
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
	FormtoolsMask,
} from '.'
import { useConfigContextProvider } from '../context/config'
import { SchemaType } from "../types/schema"
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

const components = {
    password: (schema: InputProps) => <FormtoolsPassword {...schema as any}/>,
    search: (schema: SearchProps) => <FormtoolsSearch {...schema}/>,
    select: (schema: SelectProps) => <FormtoolsSelect {...schema}/>,
    checkbox: (schema: CheckboxProps) => <FormtoolsCheckbox {...schema}/>,
    radio: (schema: RadioProps) => <FormtoolsRadio {...schema}/>,
    toggle: (schema: ToggleProps) => <FormtoolsToggle {...schema}/>,
    file: (schema: FileProps) => <FormtoolsFile {...schema}/>,
    taglist: (schema: TaglistProps) => <FormtoolsTaglist {...schema}/>,
    mask: (schema: MaskProps) => <FormtoolsMask {...schema}/>,
    group: (schema: {
        title?: string,
        schema: SchemaType[]
    }) => <FormtoolsGroup title={schema.title}>
        <FormtoolsSchema
            schema={schema.schema}
        />
    </FormtoolsGroup>
}


export function FormtoolsSchema(props: SchemaProps) {
	const { inputTypes, customComponents } = useConfigContextProvider()

	return <>
		{Children.toArray(props.schema.map((schema) => {
			if (inputTypes?.indexOf(schema.formtool)!==-1) {
				return <FormtoolsInput {...schema as any} type={schema.formtool}/>
			} else if (Object.keys(components).indexOf(schema.formtool)!==-1) {
				return components?.[schema.formtool as keyof typeof components](schema as any)
			} else {
				return customComponents?.[schema.formtool](schema)
			}
		}))}
	</>
}
