
export function createCustomComponent<T>(Component: Function){
    return (props: T, key: number) => Component(props, key)
}
