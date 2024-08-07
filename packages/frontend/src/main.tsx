import { render } from 'preact'
import { App } from './app.tsx'
import "./normalize.css"
import "./global.css"

render(<App />, document.getElementById('app')!)
