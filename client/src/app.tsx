import * as React from 'react'
import { App } from './app/App'
import { createRoot } from 'react-dom/client'

const $app = document.querySelector<HTMLDivElement>('#app')!

const root = createRoot($app)
root.render(<App />)

export {}
