import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { initTranslations } from './lang/i18n'

initTranslations()

const ROOT = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

ROOT.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
