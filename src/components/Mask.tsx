// import { useState, useEffect } from 'react'
import Wrapper from './generic/Wrapper'
import { MaskProps } from "../types/inputs"
import { useFormContext, Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

/**
 * A = A - Z
 * a = a - z
 * z = A - Z e a - z
 * 0 = 1 - 9
 */

export function FormtoolsMask(props: MaskProps) {
    const { control } = useFormContext()

    return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
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
            />}
        />
    </Wrapper>
}