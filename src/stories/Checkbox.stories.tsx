import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormtoolsCheckbox, FormtoolsForm } from '..'
import type { CheckboxProps } from '..'

interface User {
    single_checkbox: boolean
}

const meta: Meta<CheckboxProps> = {
    component: FormtoolsCheckbox,
    decorators: (Story) => <FormtoolsForm<User> onSubmit={(data: User)=>{
        console.log(data)
    }}>
        <Story/>
        <button>ENVIAR</button>
    </FormtoolsForm>
}
 
export default meta
type Story = StoryObj<CheckboxProps>

export const Primary: Story = {
    args: {
        name: 'single_checkbox',
        label: 'Legal',
        placeholder: 'Teste'
    }
}