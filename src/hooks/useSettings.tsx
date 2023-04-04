import { createContext, useContext, PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LOCALE } from '../lang/i18n'
import { Locale } from '../types'
import { valueOrThrow } from '../utils'
import { useLocalStorage } from './useLocalStorage'

type BooleanSetting = {
  value: boolean
  toggle(): void
}

type OpenSetting<T> = {
  value: T
  set(newValue: T): void
}

type SettingsContext = {
  locale: OpenSetting<Locale>
  allowIncorrectWords: BooleanSetting
  allowIncorrectChars: BooleanSetting
}

const SETTINGS_CONTEXT = createContext<SettingsContext | undefined>(undefined)

export function useSettings() {
  return valueOrThrow(useContext(SETTINGS_CONTEXT))
}

export function SettingsProvider({ children }: PropsWithChildren<unknown>) {
  const [locale, setLocale] = useLocalStorage('locale', DEFAULT_LOCALE)
  const { i18n } = useTranslation()

  const [canSubmitIncorrectChars, setCanSubmitIncorrectChars] = useLocalStorage(
    'canSubmitIncorrectChars',
    false
  )

  const [canSubmitIncorrectWords, setCanSubmitIncorrectWords] = useLocalStorage(
    'canSubmitIncorrectWords',
    false
  )

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [i18n, locale])

  return (
    <SETTINGS_CONTEXT.Provider
      value={{
        locale: {
          value: locale,
          set: setLocale,
        },
        allowIncorrectChars: {
          value: canSubmitIncorrectChars,
          toggle: () => setCanSubmitIncorrectChars((v) => !v),
        },
        allowIncorrectWords: {
          value: canSubmitIncorrectWords,
          toggle: () => setCanSubmitIncorrectWords((v) => !v),
        },
      }}
    >
      {children}
    </SETTINGS_CONTEXT.Provider>
  )
}
