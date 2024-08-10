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
    GroupProps,
    PasswordProps,
    DefaultProps
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
export type SelectSchemaProps = SelectProps & {
    formtool: 'select'
}

// Search
export interface SearchSchemaProps extends SearchProps {
    formtool: 'search'
}

// File
export interface FileSchemaProps extends FileProps {
    formtool: 'file'
}

// Mask
export interface MaskSchemaProps extends MaskProps {
    formtool: 'mask'
}

// Radio
export interface RadioSchemaProps extends RadioProps {
    formtool: 'radio'
}

// Toggle
export interface ToggleSchemaProps extends ToggleProps {
    formtool: 'toggle'
}

// Taglist
export type TaglistSchemaProps = TaglistProps & {
    formtool: 'taglist'
}

// Group
export type GroupSchemaProps<CustomComponentsProps extends DefaultProps | undefined = undefined> = GroupProps & {
    formtool: 'group'
    schema: SchemaType<CustomComponentsProps>[]
}


/* TIPOS DO SCHEMA */
export type SchemaType<CustomComponentsProps extends DefaultProps | undefined = undefined>  = InputSchemaProps |
    CheckboxSchemaProps |
    SelectSchemaProps |
    SearchSchemaProps |
    FileSchemaProps |
    MaskSchemaProps |
    RadioSchemaProps |
    ToggleSchemaProps |
    TaglistSchemaProps |
    GroupSchemaProps<CustomComponentsProps> |
    CustomComponentsProps

export interface SchemaProps<CustomComponentsProps extends DefaultProps | undefined = undefined> {
	schema: SchemaType<CustomComponentsProps>[]
}
