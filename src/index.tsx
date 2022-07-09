import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { initTranslations } from './lang/i18n'
import { LocaleProvider } from './hooks/useLocale'

initTranslations()

const ROOT = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

ROOT.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
