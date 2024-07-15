import Wrapper from './generic/Wrapper'
import { FileProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import React, { useState, Children } from 'react'

import { getWrapperProperties } from '../utils/components'

export function FormtoolsFile({
    name,
    label,
    help,
    aftericon,
    beforeicon,
    validation,
    placeholder,

    containerClassName: containerclassname,
    labelClassName: labelclassname,
    insiderClassName: insiderclassname,
    beforeIconClassName: beforeIconclassname,
    afterIconClassName: afterIconclassname,
    helpClassName: helpclassname,
    errorsClassName: errorsclassname,
    ...rest
}: FileProps) {
	const { register } = useFormContext()
	const [ filesNames, setFilesNames ] = useState<string[]>([])

	return <Wrapper
        name={name}
        label={label}
        help={help}
        aftericon={aftericon}
        beforeicon={beforeicon}
        {...{
            containerClassName: containerclassname,
            labelClassName: labelclassname,
            insiderClassName: insiderclassname,
            beforeIconClassName: beforeIconclassname,
            afterIconClassName: afterIconclassname,
            helpClassName: helpclassname,
            errorsClassName: errorsclassname,
        }}
    >
		<input className={'formtools-input'} type="file" id={name} style={{ display: 'none' }} {...rest} {...register(name, {
			...validation,
			onChange: (e) => setFilesNames(Object.values(e.target.files as FileList).map((file) => file.name))
		})}/>
		<label htmlFor={name} className={'formtools-file-label'}>
			{filesNames.length==0 && placeholder}
			{filesNames && <ul className={'formtools-file-list'}>
				{ Children.toArray(filesNames.map(file => <li className={'formtools-file-item'}>{file}</li>)) }
			</ul>}
		</label>
	</Wrapper>
}
