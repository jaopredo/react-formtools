import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormtoolsSchema, FormtoolsForm, FormtoolsInput } from '..'
import type { SchemaType, SchemaProps } from '..'

interface User {
    name: string
    password: string
}

const meta: Meta<SchemaProps> = {
    component: FormtoolsSchema,
    decorators: (Story) => <FormtoolsForm<User> onSubmit={(data: User)=>{
        console.log(data)
    }}>
        <Story/>
        <button>ENVIAR</button>
    </FormtoolsForm>
}
 
export default meta
type Story = StoryObj<SchemaProps>
 
const schema: SchemaType[] = [
    {
        formtool: 'text',
        label: 'Insira seu nome',
        name: 'name',
    },
    {
        formtool: 'password',
        label: 'Insira uma senha',
        name: 'password'
    }
]

export const Primary: Story = {
    args: {
        schema
    },
}