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

export type ElementsTypes = "checkbox" |
'select' |
'search' |
'file' |
'mask' |
'radio' |
'toggle' |
'taglist' |
'group'

export type SchemaType  = (InputProps | CheckboxProps | SelectProps | SearchProps | FileProps | RadioProps | TaglistProps | ToggleProps | MaskProps | GroupProps | { [x: string]: any }) & {
    formtool: InputTypes | ElementsTypes | string
}

export type GroupProps = {
    title?: string,
    schema: SchemaType[]
}

export interface SchemaProps {
	schema: SchemaType[]
}
