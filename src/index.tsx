import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './components/App'
import { LocaleProvider } from './hooks/useLocale'
import { initTranslations } from './lang/i18n'

initTranslations()

const ROOT_ELEMENT = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(ROOT_ELEMENT).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
