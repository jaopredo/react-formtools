import { createContext, useContext } from "react"
import ConfigInterface from "../types/config"

const defaultConfigContextValue: ConfigInterface = {
    themes: {
        container: '',
        label: '',
        insider: '',
        'before-icon': '',
        'after-icon': '',
        help: '',
        errors: ''
    }
}

export const Config = createContext<ConfigInterface>(defaultConfigContextValue)


export function ConfigContextProvider({ children, config }: {
    children: React.ReactNode,
    config: ConfigInterface
}) {
    return <Config.Provider value={config || defaultConfigContextValue}>
        {children}
    </Config.Provider>
}


export function useConfigContextProvider() {
    return useContext(Config) as ConfigInterface
}
