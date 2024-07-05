import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
 
import { FormtoolsSchema, FormtoolsForm } from '..'
import type { SchemaType, SchemaProps } from '..'
 
const meta: Meta<SchemaProps> = {
    component: FormtoolsSchema,
    decorators: (Story) => <FormtoolsForm onSubmit={()=>{}}>
        <Story/>
    </FormtoolsForm>
}
 
export default meta
type Story = StoryObj<SchemaProps>
 
const schema: SchemaType[] = [
    {
        formtool: 'text',
        label: 'Teste',
        name: 'teste',
    }
]

export const Primary: Story = {
    args: {
        schema
    },
}