import { useState } from 'react'

import SchemaForm from './SchemaForm'
import NormalForm from './NormalForm'

export default function App() {
  const [ schema, setSchema ] = useState<boolean>(false)

  return <div className="App">
    <button onClick={()=>setSchema(!schema)}>ALTERAR</button>

    { !schema && <NormalForm/> }
    { schema && <SchemaForm/> }
  </div>
}
