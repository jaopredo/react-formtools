import Wrapper from './generic/Wrapper'
import { TaglistProps, OptionType } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import React, { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { jaroWinklerSimilarity } from '../utils/functions'

import { getWrapperProperties } from '../utils/components'

export function FormtoolsTaglist(props: TaglistProps) {
	const { setValue } = useFormContext()
	const [ loading, setLoading ] = useState<boolean>(false)
	const [ editedOptions, setEditedOptions ] = useState<OptionType[]>( props.type=='options' ? props.options : [] )
	const [ tags, setTags ] = useState<OptionType[]>([])
	const [ showOptions, setShowOptions ] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)


	useEffect(()=>{
		setValue(props.name, tags.map(tag=>tag.value))
	}, [ tags ])


	useEffect(() => {
		if (props.type == 'async') {
			setLoading(true)
			props.asyncLoad().then(resp=>{
				setEditedOptions(resp)
				setLoading(false)
			})
		}
	}, [])


	/* QUANDO EU CLICAR NO ENTER OU NA VIRGULA */
	function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
		const { value } = e.currentTarget
        if ((props.type === 'typing' || props.type==='async') && (props.addKeys.includes(e.key))) {
            let newValue = value.slice(-1)===e.key?value.slice(0,-1):value
            setTags([...tags, {value: newValue, label: newValue}])
            e.currentTarget.value = ""
        } else if (props.type === 'options') {
            if (value === "") {
                setEditedOptions(props.options)
            } else {
                if (e.key === 'Enter' || e.key === ",") {
                    setEditedOptions(props.options)
                    setTags([...tags, editedOptions[0]])
                    e.currentTarget.value = ""
                } else {
                    const newOptions = props.options.filter(opt =>jaroWinklerSimilarity(value, opt.label)>value.length*0.1)
                    setEditedOptions(newOptions)
                }
            }
        }
	}

	return <Wrapper {...getWrapperProperties(props)} 
	aftericon={<IoIosArrowDown onClick={()=>setShowOptions(!showOptions)}/>}>
		<ul className={`formtools-taglist ${props.taglistClassName || ''}`}>
			{tags.map((opt, idx) =>
				opt && <Tag
					{...opt}
					setTags={setTags}
					tags={tags}
					key={idx}
					
					taglistTagClassName={props.taglistTagClassName}
				/>
			)}
		</ul>
		<input ref={inputRef} placeholder={props.placeholder} onKeyUp={handleKeyUp} className={`formtools-input ${props.className||''}`}/>
		{(showOptions && props.type!=='typing') && <ul className={`formtools-taglist-options ${props.taglistOptionsClassName||''}`}>
			{(props.type=='async' && loading) && <p className={`formtools-taglist-load ${props.taglistLoadClassName||''}`}>CARREGANDO</p>}
			{editedOptions.map((opt, idx)=>
				<Option
					{...opt}
					tags={tags}
					editedOptions={editedOptions}
					setTags={setTags}
					key={idx}

					taglistOptionClassName={props.taglistOptionClassName}
				/>
			)}
		</ul>}
	</Wrapper>
}


function Option({
	label,
	value,
	tags,
	setTags,
	editedOptions,

	taglistOptionClassName
}: {
	editedOptions: OptionType[]
	tags: OptionType[]
	setTags: Function

	taglistOptionClassName?: string
} & OptionType) {
	const [ selected, setSelected ] = useState<boolean>()

	useEffect(() => {
		for (let tag of tags) {
			if (tag.value === value) {
				setSelected(true)
				return
			}
		}
		setSelected(false)
	}, [tags, editedOptions])

	function onClick() {
		if (!selected) {
			setTags([...tags, { label, value }])
			setSelected(true)
		}
	}

	return <li className={`formtools-taglist-option ${taglistOptionClassName||''}` + (selected?('formtools-taglist-option-selected'):'')} onClick={onClick}
	>{label}</li>
}


function Tag({ label, value, tags, setTags, taglistTagClassName }: {
	label: string
	value: any
	setTags: Function
	tags: OptionType[]
	
	taglistTagClassName?: string
}) {
	/* QUANDO EU CLICO NA TAGZINHA */
	function handleTagClick() {
		setTags(tags.filter(tag => tag.value !== value))
	}

	return <li className={`formtools-taglist-tag ${taglistTagClassName || ''}`} onClick={handleTagClick}>{ label }</li>
}