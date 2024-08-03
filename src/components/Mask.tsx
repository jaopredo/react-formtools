import React from 'react'
import Wrapper from './generic/Wrapper'
import { MaskProps } from "../types/inputs"
import { useFormContext, Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { getWrapperProperties, removeWrapperProperties } from '../utils/components'

export function FormtoolsMask(props: MaskProps) {
    const { control } = useFormContext()

    return <Wrapper {...getWrapperProperties(props)}>
        <Controller
            control={control}
            name={props.name}
            render={({ field: { onChange } }) => <IMaskInput
                {...removeWrapperProperties(props) as MaskProps}
                onAccept={(value, ref, e) => {
                    onChange(value)
                    if (props.onAccept) {
                        props.onAccept(value, ref, e)
                    }
                }}
                className={`formtools-input ${props.className||''}`}
            />}
        />
    </Wrapper>
}