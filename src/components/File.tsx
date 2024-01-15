import Wrapper from './generic/Wrapper'
import { FileProps } from '../types/inputs'
import { CiFileOn } from "react-icons/ci"
import { useFormContext } from 'react-hook-form'
import { useState, ChangeEvent, Children } from 'react'
import { useConfigContextProvider } from '../context/config'

export function FormtoolsFile({ name, label, help, aftericon, beforeicon, validation, placeholder, ...rest }: FileProps) {
	const { register } = useFormContext()
	const [ filesNames, setFilesNames ] = useState<string[]>([])
	const { themes } = useConfigContextProvider()

	return <Wrapper name={name} label={label} help={help} aftericon={aftericon}
	beforeicon={beforeicon}>
		<input className={'formtools-input ' + themes.input} type="file" id={name} style={{ display: 'none' }} {...rest} {...register(name, {
			...validation,
			onChange: (e) => setFilesNames(Object.values(e.target.files as FileList).map((file) => file.name))
		})}/>
		<label htmlFor={name} className={'formtools-file-label ' + themes['file-label']}>
			{!filesNames && placeholder}
			{filesNames && <ul className={'formtools-file-list ' + themes['file-list']}>
				{ Children.toArray(filesNames.map(file => <li className={'formtools-file-item ' + themes['file-item']}>{file}</li>)) }
			</ul>}
		</label>
	</Wrapper>
}
