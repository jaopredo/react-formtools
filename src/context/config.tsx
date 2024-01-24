import { createContext, useContext } from "react"
import { ConfigInterface } from "../types/config"

const defaultConfigContextValue: ConfigInterface = {
    themes: {
        container: '',
        label: '',
        insider: '',
        'before-icon': '',
        'after-icon': '',
        help: '',
        errors: ''
    },
    inputTypes: [
		'email',
		"text",
		"number",
		"range",
		"date",
		"time",
		"color",
		"submit",
		"reset",
		"button",
		"email",
		"tel",
	],
}

export const Config = createContext<ConfigInterface>(defaultConfigContextValue)


export function ConfigContextProvider({ children, config }: {
    children: React.ReactNode,
    config: ConfigInterface
}) {
    return <Config.Provider value={{
        ...defaultConfigContextValue,
        ...config
    }}>
        {children}
    </Config.Provider>
}


export function useConfigContextProvider() {
    return useContext(Config) as ConfigInterface
}
