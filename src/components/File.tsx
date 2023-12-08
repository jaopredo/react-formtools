import Wrapper from './generic/Wrapper'
import { FileProps } from '../types/inputs'
import { CiFileOn } from "react-icons/ci"
import { useFormContext } from 'react-hook-form'
import { useState, ChangeEvent, Children } from 'react'

export function FormtoolsFile({ name, label, help, aftericon, validation, placeholder, ...rest }: FileProps) {
	const { register, setValue } = useFormContext()
	const [ filesNames, setFilesNames ] = useState<string[]>([])

	return <Wrapper name={name} label={label} help={help} aftericon={aftericon}
	beforeicon={<CiFileOn/>}>
		<input type="file" id={name} style={{ display: 'none' }} {...rest} {...register(name, {
			...validation,
			onChange: (e) => setFilesNames(Object.values(e.target.files as FileList).map((file) => file.name))
		})}/>
		<label htmlFor={name}>
			{!filesNames && placeholder}
			{filesNames && <ul>
				{ Children.toArray(filesNames.map(file => <li>{file}</li>)) }
			</ul>}
		</label>
	</Wrapper>
}
