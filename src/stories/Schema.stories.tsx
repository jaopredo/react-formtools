import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormtoolsSchema, FormtoolsForm, FormtoolsInput } from '..'
import type { SchemaType, SchemaProps } from '..'


const meta: Meta<SchemaProps> = {
    component: FormtoolsSchema,
    decorators: (Story) => <FormtoolsForm multipart onSubmit={()=>{}}>
        <Story/>
        <button>ENVIAR</button>
    </FormtoolsForm>
}
 
export default meta
type Story = StoryObj<SchemaProps>
 
const schema: SchemaType[] = [
    {
        formtool: 'text',
        label: 'Mais um teste',
        name: 'test2',
    }
]

export const Primary: Story = {
    args: {
        schema
    },
}