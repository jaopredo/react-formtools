import Wrapper from './generic/Wrapper'
import { FileProps } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import React, { useState, Children } from 'react'

import { getWrapperProperties, removeWrapperProperties } from '../utils/components'

export function FormtoolsFile(props: FileProps) {
	const { register } = useFormContext()
	const [ filesNames, setFilesNames ] = useState<string[]>([])

	return <Wrapper {...getWrapperProperties(props)}>
		<input
            className={`formtools-input ${props.fileInputClassName||''}`}
            type="file"
            id={props.name}
            style={{ display: 'none' }}
            {...register(props.name, {
                ...props.validation,
                onChange: (e) => setFilesNames(Object.values(e.target.files as FileList).map((file) => file.name))
		    })}

            {...removeWrapperProperties(props, [
                'fileInputClassName',
                'fileListClassName',
                'fileListItemClassName'
            ])}
        />
		<label htmlFor={props.name} className={`formtools-file-label ${props.className || ''}`}>
			{filesNames.length==0 && props.placeholder}
			{filesNames && <ul className={`formtools-file-list ${props.fileListClassName || ''}`}>
				{ Children.toArray(filesNames.map(file => <li className={`formtools-file-item ${props.fileListItemClassName || ''}`}>{file}</li>)) }
			</ul>}
		</label>
	</Wrapper>
}
