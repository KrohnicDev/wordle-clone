import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { initTranslations } from './lang/i18n'
import { LocaleProvider } from './hooks/useLocale'
import { WordleProvider } from './hooks/useWordleGame'

initTranslations()

const ROOT_ELEMENT = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(ROOT_ELEMENT).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <LocaleProvider>
        <WordleProvider>
          <App />
        </WordleProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
