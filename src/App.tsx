import { config } from './config'
import { ConfigContextProvider } from './context/config'

import SchemaForm from './SchemaForm'

export default function App() {
    return <div className="App">
        <ConfigContextProvider config={config}>
            <SchemaForm/>
        </ConfigContextProvider>
    </div>
}
