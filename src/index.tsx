import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './components/App'
import { SettingsProvider } from './hooks/useSettings'
import { initTranslations } from './lang/i18n'

initTranslations()

const ROOT_ELEMENT = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(ROOT_ELEMENT).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
