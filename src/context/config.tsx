import { createContext, useContext } from "react"
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
import {
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
    FormtoolsSchema
} from '../components'
import ConfigInterface from "../types/config"

const defaultConfigContextValue: ConfigInterface = {
    themes: {
        container: '',
        label: '',
        insider: '',
        'before-icon': '',
        'after-icon': '',
        help: '',
        errors: ''
    },
    inputTypes: [
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
	],
	components: {
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
}

export const Config = createContext<ConfigInterface>(defaultConfigContextValue)


export function ConfigContextProvider({ children, config }: {
    children: React.ReactNode,
    config: ConfigInterface
}) {
    return <Config.Provider value={{
        ...defaultConfigContextValue,
        ...config
    }}>
        {children}
    </Config.Provider>
}


export function useConfigContextProvider() {
    return useContext(Config) as ConfigInterface
}
