import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormtoolsSchema, FormtoolsForm } from '..'
import type { SchemaType, SchemaProps } from '..'

import { CiFileOn } from "react-icons/ci"

const meta: Meta<SchemaProps> = {
    component: FormtoolsSchema,
    decorators: (Story) => <FormtoolsForm onSubmit={()=>{}}>
        <Story/>
        <button>ENVIAR</button>
    </FormtoolsForm>
}
 
export default meta
type Story = StoryObj<SchemaProps>
 
const schema: SchemaType[] = [
    {
        formtool: 'group',
        schema: [
            {
                formtool: 'select',
                label: 'Teste',
                name: 'teste',
                validation: {
                    required: { value: true, message: 'Preencha' }
                },
                type: 'options',
                options: [
                    {
                        label: 'Teste 01',
                        value: 'test1'
                    },
                    {
                        label: 'Teste 02',
                        value: 'test2'
                    },
                ]
            }
        ]
    }
]

export const Primary: Story = {
    args: {
        schema
    },
}