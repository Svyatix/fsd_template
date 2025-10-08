import React from 'react'
import { createRoot } from 'react-dom/client'
import MicroApp from './mfe/MicroApp'

const root = createRoot(document.getElementById('root')!)
root.render(<React.StrictMode><MicroApp basename="/" /></React.StrictMode>)