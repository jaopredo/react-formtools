import React, { useState, Children, useEffect, useRef} from 'react'
import { SearchProps, OptionType } from '../types/inputs'
import Wrapper from './generic/Wrapper'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { IoIosArrowDown } from "react-icons/io"

export function FormtoolsSearch (props: SearchProps) {
    const { register, setValue, getValues, control } = useFormContext()  // Coisas do formulário
    const [ showDropdown, setShowDropdown ] = useState<boolean>(false)  // State que diz se mostra ou não as opções
    const [ inputLabel, setInputLabel ] = useState<string>('')  // Mostra o valor presente no input
    const { remove } = useFieldArray({ control, name: props.name})

    // Informações se for um SEARCH MÚLTIPLO
    const [ multipleSelecteds, setMultipleSelecteds ] = useState<{ [id: string|number]: string|undefined }>({})
    const handleClickRemove = (id: string|number) => {
        setMultipleSelecteds({
            ...multipleSelecteds,
            [id]: undefined
        })
        remove(getValues(props.name).indexOf( Number(id)?Number(id):id ))
    }

    const typeInputRef = useRef<HTMLInputElement>(null)  // Ref do Input que vai ser usado para alterar o value depois

    const [ options, setOptions ] = useState<OptionType[]>()  // As opções que vão ser mostradas

    const handleClickSelect = () => setShowDropdown(!showDropdown)  // O que acontece quando clico no select
    const handleClickOption = (label: string, value: any) => {  // O que acontece quando clico na opção
        if (!props.multiple) {
            setInputLabel(label)
            setValue(props.name, value)
            if (typeInputRef.current) typeInputRef.current.value = label
        } else {
            setMultipleSelecteds({ ...multipleSelecteds, [value]: label })
            setValue(`${props.name}.${Object.keys(multipleSelecteds).length}`, value)
        }
    }

    const getData = async function () {
        // Mando uma requisição com os parâmetros que o usuário informar que devem ser feitos
        return fetch(`${props.url}?` + new URLSearchParams(props.filterSchema(inputLabel))).then(resp => resp.json()).then(data => props.mapper?props.mapper(data):undefined).catch(err=>Promise.reject(err))
    }

    useEffect(() => {
        setOptions(undefined)
        getData().then(opts => setOptions(opts))
    }, [inputLabel])

    return <Wrapper name={props.name} label={props.label} help={props.help} beforeicon={props.beforeicon}
    aftericon={<IoIosArrowDown onClick={handleClickSelect}/>}>
        <input type="hidden" {...register(props.name, props.validation)}/>
        {props.multiple && <ul className={'formtools-search-list'}>
            {Children.toArray(Object.keys(multipleSelecteds).map(k => multipleSelecteds[k]?<li className={'formtools-search-item'} onClick={() => handleClickRemove(k)}>{multipleSelecteds[k]}</li>:null))}
        </ul>}
        <input className={'formtools-search'} ref={typeInputRef} placeholder={props.placeholder} onFocus={()=>setShowDropdown(true)} onChange={e => setInputLabel(e.target.value)}/>
        {showDropdown && <ul className={'formtools-search-options'}>
            {options && Children.toArray(options?.map(opt =>
                    <FormtoolsOption label={opt.label} clickmeta={() => handleClickOption(opt.label, opt.value)}/>
                ))}
            {!options && <p className={'formtools-search-load'}>Carregando...</p>}
            {props.children}
        </ul>}
    </Wrapper>
}

export function FormtoolsOption({ label, clickmeta }: { label: string, clickmeta: Function }) {
    const [ selected, setSelected ] = useState<boolean>(false)

    function onClick() {
        setSelected(true)
        clickmeta()
    }

    return <li className={'formtools-search-option'} onClick={selected?undefined:onClick}>
        {label}
    </li>
}
