import Wrapper from './generic/Wrapper'
import { MaskProps } from '../types/inputs'
import { IMaskInput } from 'react-imask'
import { useFormContext, Controller } from 'react-hook-form'

export function FormtoolsMask(props: MaskProps) {
	const { control } = useFormContext()

	return <Wrapper name={props.name} label={props.label} help={props.help} aftericon={props.aftericon} beforeicon={props.beforeicon}>
		<Controller
            control={control}
            name={props.name}
            render={({field: { ref }}) => <IMaskInput
                mask={ props.mask }
                onAccept={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                inputRef={ref}
                id={props.name}
                placeholder={props.placeholder}
            />}
        />
	</Wrapper>
}