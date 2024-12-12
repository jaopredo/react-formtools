import { HTMLProps } from "react"
import { DefaultProps } from "../types"

export function createCustomComponent<T>(Component: Function){
    return (props: T, key: number) => Component(props, key)
}


export function getWrapperProperties<T extends DefaultProps>(props: T): DefaultProps {
    const {
        name,
        label,
        aftericon,
        beforeicon,
        validation,
        help,

        containerClassName,
        labelClassName,
        insiderClassName,
        beforeIconClassName,
        afterIconClassName,
        helpClassName,
        errorClassName: errorsClassName
    } = props

    return ({
        name,
        label,
        aftericon,
        beforeicon,
        validation,
        help,

        containerClassName: containerClassName,
        labelClassName: labelClassName,
        insiderClassName: insiderClassName,
        beforeIconClassName: beforeIconClassName,
        afterIconClassName: afterIconClassName,
        helpClassName: helpClassName,
        errorClassName: errorsClassName
    })
}

export function removeWrapperProperties<T extends DefaultProps, E extends HTMLElement>(props: T, extras: string[] = []): HTMLProps<E> {
    const keysList = [
        'formtool',

        'name',
        'label',
        'aftericon',
        'beforeicon',
        'validation',
        'help',

        'containerClassName',
        'labelClassName',
        'insiderClassName',
        'beforeIconClassName',
        'afterIconClassName',
        'helpClassName',
        'errorsClassName',

        ...extras
    ]
    let newObject: any = {}

    const filtered = Object.keys(props).filter(k => !keysList.includes(k))

    filtered.forEach(key => {
        newObject = {
            [key]: props[key as keyof DefaultProps]
        }
    })

    return newObject as HTMLProps<E>
}
