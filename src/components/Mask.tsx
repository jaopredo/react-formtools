// import { useState, useEffect } from 'react'
import Wrapper from './generic/Wrapper'
import { MaskProps } from "../types/inputs"
import { useFormContext, Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { useConfigContextProvider } from '../context/config'


export function FormtoolsMask(props: MaskProps) {
    const { control } = useFormContext()
    const { themes } = useConfigContextProvider()

    return <Wrapper family='mask' name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
        <Controller
            control={control}
            name={props.name}
            render={({ field: { onChange } }) => <IMaskInput
                {...props}
                onAccept={(value, ref, e) => {
                    onChange(value)
                    if (props.onAccept) {
                        props.onAccept(value, ref, e)
                    }
                }}
                className={'formtools-input ' + themes.input}
            />}
        />
    </Wrapper>
}