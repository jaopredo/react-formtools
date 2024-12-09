import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormtoolsFile, FormtoolsForm } from '..'
import type { FileProps } from '..'

interface User {
    file: FileList
}

const meta: Meta<FileProps> = {
    component: FormtoolsFile,
    decorators: (Story) => <FormtoolsForm<User> onSubmit={(data: User)=>{
        console.log(data)
        console.log(data.file)
    }}>
        <Story/>
        <button>ENVIAR</button>
    </FormtoolsForm>
}
 
export default meta
type Story = StoryObj<FileProps>

export const Primary: Story = {
    args: {
        name: 'file',
        label: 'Arquivo',
        placeholder: 'Teste'
    }
}