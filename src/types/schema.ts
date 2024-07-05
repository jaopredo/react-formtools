import {
    InputProps,
    CheckboxProps,
    SelectProps,
    SearchProps,
    MaskProps,
    FileProps,
    RadioProps,
    TaglistProps,
    ToggleProps,
    PasswordProps
} from '../types/inputs'

/* TIPOS DO INPUT */
export type InputTypes = 'email'|
"text"|
"number"|
"range"|
"date"|
"time"|
"color"|
"submit"|
"reset"|
"button"|
"email"|
"tel"|
'password' 

export interface InputSchemaProps extends InputProps {
    formtool: InputTypes
}

/* TIPOS DOS OUTROS ELEMENTOS */
export type ElementsTypes = "checkbox" |
'select' |
'search' |
'file' |
'mask' |
'radio' |
'toggle' |
'taglist' |
'group'

// Checkbox
export interface CheckboxSchemaProps extends CheckboxProps {
    formtool: 'checkbox'
}

// Select
export interface SelectSchemaProps extends SelectProps {
    formtool: 'select'
}

/* TIPOS DO SCHEMA */
export type SchemaType  = InputSchemaProps | CheckboxSchemaProps | SelectSchemaProps

export type GroupProps = {
    title?: string,
    schema: SchemaType[]
}

export interface SchemaProps {
	schema: SchemaType[]
}
