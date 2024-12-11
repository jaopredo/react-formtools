import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormtoolsForm, FormtoolsInput } from '..'
import type { FormtoolsFormProps } from '..'

interface User {
    name: string
    email: string
    password: string
}

const meta: Meta<FormtoolsFormProps<User>> = {
    component: FormtoolsForm,
}
 
export default meta
type Story = StoryObj<FormtoolsFormProps<User>>

export const Primary: Story = {
    args: {
        multipart: true
    },
    render: function Render(args) {

        function onSubmit(data: User) {
            console.log(data)
        }

        return <FormtoolsForm {...args} onSubmit={onSubmit}>
            <FormtoolsInput
                name='name'
                label='Digite seu nome:'
            />
        </FormtoolsForm>
    }
}