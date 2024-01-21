import { ConfigContextProvider } from './context/config'
import { useAppConfig } from './Configs'

import SchemaForm from './SchemaForm'

export default function App() {
    const config = useAppConfig()

    return <div className="App">
        <ConfigContextProvider config={config}>
            <SchemaForm/>
        </ConfigContextProvider>
    </div>
}
