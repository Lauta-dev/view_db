import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@src/App'
import '@css/tailwindGlobals.css'
import '@css/normalize.css'
import "./useWorker"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
