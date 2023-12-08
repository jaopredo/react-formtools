import Wrapper from './generic/Wrapper'
import { TaglistProps, OptionType } from '../types/inputs'
import { useFormContext } from 'react-hook-form'
import { useState, Children, useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { jaroWinklerSimilarity } from '../utils/functions'

export function FormtoolsTaglist(props: TaglistProps) {
	const { setValue, control } = useFormContext()
	const [ loading, setLoading ] = useState<boolean>(false)
	const [ editedOptions, setEditedOptions ] = useState<OptionType[]>(props.options || [])
	const [ tags, setTags ] = useState<OptionType[]>([])
	const [ showOptions, setShowOptions ] = useState<boolean>(false)


	useEffect(()=>{
		setValue(props.name, tags.map(tag=>tag.value))
	}, [ tags ])


	useEffect(() => {
		if (props.asyncLoad) {
			setLoading(true)
			props.asyncLoad().then(getter=>getter().then(resp => {
				setEditedOptions(resp)
				setLoading(false)
			}))
		}
	}, [])


	/* QUANDO EU CLICAR NO ENTER OU NA VIRGULA */
	function handleKeyUp(e) {
		const { value } = e.target
		if (props.type === 'typing' && (e.key === 'Enter' || e.key === ',')) {
			let newValue = value.slice(-1)===','?value.slice(0,-1):value
			setTags([...tags, {value: newValue, label: newValue}])
			e.target.value = ""
		} else if (props.type === 'options') {
			if (value === "") {
				setEditedOptions(props.options)
			} else {
				if (e.key === 'Enter' || e.key === ",") {
					setEditedOptions(props.options)
					setTags([...tags, editedOptions[0]])
					e.target.value = ""
				} else {
					const newOptions = props.options.filter(opt =>jaroWinklerSimilarity(value, opt.label)>value.length*0.1)
					setEditedOptions(newOptions)
				}
			}
		}
	}

	return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon} 
	aftericon={<IoIosArrowDown onClick={()=>setShowOptions(!showOptions)}/>}>
		<ul>
			{tags.map((opt, idx) => opt && <Tag {...opt} setTags={setTags} tags={tags} key={idx}/>)}
		</ul>
		<input placeholder={props.placeholder} onKeyUp={handleKeyUp}/>
		{(showOptions && props.type!=='typing') && <ul>
			{(props.type=='async' && loading) && <p>CARREGANDO</p>}
			{editedOptions.map((opt, idx)=> <Option {...opt} tags={tags} editedOptions={editedOptions} setTags={setTags} key={idx}/>)}
		</ul>}
	</Wrapper>
}



function Option({ label, value, tags, setTags, editedOptions }: {editedOptions: OptionType[], tags: OptionType[]|string[], setTags: Function} & OptionType) {
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

	return <li onClick={onClick}
		style={{
			color: selected?'blue':'black'
		}}
	>{label}</li>
}


function Tag({ label, value, tags, setTags }: {
	label: string,
	value: any,
	setTags: Function,
	tags: OptionType[]|string[]
}) {
	/* QUANDO EU CLICO NA TAGZINHA */
	function handleTagClick() {
		setTags(tags.filter(tag => tag.value !== value))
	}

	return <li onClick={handleTagClick}>{ label }</li>
}