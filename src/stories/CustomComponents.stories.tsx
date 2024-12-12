import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
    FormtoolsSchema,
    FormtoolsForm,
    ConfigContextProvider,
    createCustomComponent,
    
    Wrapper,
    DefaultProps,

} from '..'
import type { SchemaType, SchemaProps } from '..'
import { useFormContext } from 'react-hook-form'

interface User {
    name: string
    password: string
}

interface CustomComponentProps extends DefaultProps {
    formtool: 'test'
}

function TestComponent(props: CustomComponentProps) {
    const { register } = useFormContext()

    return <Wrapper {...props}>
        <input {...register(props.name, props.validation)}/>
        MEU PRÓPRIO COMPONENTE
    </Wrapper>
}

const schema: SchemaType<CustomComponentProps>[] = [
    {
        formtool: 'group',
        className: 'teste',
        schema: [
            {
                formtool: 'text',
                label: 'Insira seu nome',
                name: 'name',
            },
            {
                formtool: 'password',
                label: 'Insira uma senha',
                name: 'password'
            },
            {
                formtool: 'test',
                label: 'Input de Teste',
                name: 'test_input'
            }
        ]
    },
    {
        formtool: 'test',
        label: 'Input de Teste',
        name: 'test_input'
    }
]

const meta: Meta<SchemaProps> = {
    component: FormtoolsSchema,
    decorators: (Story) => <ConfigContextProvider config={{
        customComponents: {
            test: createCustomComponent(TestComponent)
        }
    }}>
        <FormtoolsForm<User> onSubmit={(data: User)=>{
            console.log(data)
        }}>
            <Story/>
            <FormtoolsSchema
                schema={schema}
            />
            <button>ENVIAR</button>
        </FormtoolsForm>
    </ConfigContextProvider>
}
 
export default meta
type Story = StoryObj<SchemaProps<CustomComponentProps>>

export const Primary: Story = {
    args: {
        schema
    },
}