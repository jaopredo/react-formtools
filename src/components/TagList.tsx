import Wrapper from './generic/Wrapper'
import { TaglistProps, OptionType } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { jaroWinklerSimilarity } from '../utils/functions'
import { useConfigContextProvider } from '../context/config'

export function FormtoolsTaglist(props: TaglistProps) {
	const { setValue } = useFormContext()
	const [ loading, setLoading ] = useState<boolean>(false)
	const [ editedOptions, setEditedOptions ] = useState<OptionType[]>(props.options || [])
	const [ tags, setTags ] = useState<OptionType[]>([])
	const [ showOptions, setShowOptions ] = useState<boolean>(false)
	const { themes } = useConfigContextProvider()
    const inputRef = useRef<HTMLInputElement>(null)


	useEffect(()=>{
		setValue(props.name, tags.map(tag=>tag.value))
	}, [ tags ])


	useEffect(() => {
		if (props.asyncLoad) {
			setLoading(true)
			props.asyncLoad().then(getter=>getter().then((resp: any) => {
				setEditedOptions(resp)
				setLoading(false)
			}))
		}
	}, [])


	/* QUANDO EU CLICAR NO ENTER OU NA VIRGULA */
	function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
		const { value } = e.currentTarget
        if (props.type === 'typing' && (e.key === 'Enter' || e.key === ',')) {
            let newValue = value.slice(-1)===','?value.slice(0,-1):value
            setTags([...tags, {value: newValue, label: newValue}])
            e.currentTarget.value = ""
        } else if (props.type === 'options' && props.options) {
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

	return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon} 
	aftericon={<IoIosArrowDown onClick={()=>setShowOptions(!showOptions)}/>}>
		<ul className={'formtools-taglist ' + themes['taglist-tags']}>
			{tags.map((opt, idx) => opt && <Tag {...opt} setTags={setTags} tags={tags} key={idx}/>)}
		</ul>
		<input ref={inputRef} placeholder={props.placeholder} onKeyUp={handleKeyUp} className={'formtools-input ' + themes.input}/>
		{(showOptions && props.type!=='typing') && <ul className={'formtools-taglist-options ' + themes['taglist-options']}>
			{(props.type=='async' && loading) && <p className={'formtools-taglist-load ' + themes['taglist-load']}>CARREGANDO</p>}
			{editedOptions.map((opt, idx)=> <Option {...opt} tags={tags} editedOptions={editedOptions} setTags={setTags} key={idx}/>)}
		</ul>}
	</Wrapper>
}


function Option({ label, value, tags, setTags, editedOptions }: {editedOptions: OptionType[], tags: OptionType[], setTags: Function} & OptionType) {
	const [ selected, setSelected ] = useState<boolean>()
	const { themes } = useConfigContextProvider()

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

	return <li className={'formtools-taglist-option ' + themes['taglist-option']} onClick={onClick}
		style={{
			color: selected?'blue':'black'
		}}
	>{label}</li>
}


function Tag({ label, value, tags, setTags }: {
	label: string,
	value: any,
	setTags: Function,
	tags: OptionType[]
}) {
	const { themes } = useConfigContextProvider()
	
	/* QUANDO EU CLICO NA TAGZINHA */
	function handleTagClick() {
		setTags(tags.filter(tag => tag.value !== value))
	}

	return <li className={'formtools-taglist-tag ' + themes['taglist-tag']} onClick={handleTagClick}>{ label }</li>
}