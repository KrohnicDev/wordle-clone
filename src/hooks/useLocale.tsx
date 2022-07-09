import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LOCALE } from '../lang/i18n'
import { Locale } from '../types'
import { valueOrThrow } from '../utils'
import { useLocalStorage } from './useLocalStorage'

interface UseLocale {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export function useLocale() {
  return valueOrThrow(useContext(LocaleContext))
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const LocaleContext = createContext<UseLocale | undefined>(undefined)

export function LocaleProvider({ children }: PropsWithChildren<unknown>) {
  const [locale, setLocale] = useLocalStorage('locale', DEFAULT_LOCALE)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [i18n, locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}