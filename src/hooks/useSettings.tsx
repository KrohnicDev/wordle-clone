import { createContext, useContext, PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LOCALE } from '../lang/i18n'
import { Locale } from '../types'
import { OpenSetting, BooleanSetting } from '../types/settings-types'
import { valueOrThrow } from '../utils'
import { useLocalStorage, useSessionStorage } from './useStorage'

type SettingsContext = {
  locale: OpenSetting<Locale>
  checkIncorrectWords: BooleanSetting
  checkIncorrectChars: BooleanSetting
}

const SETTINGS_CONTEXT = createContext<SettingsContext | undefined>(undefined)

export function useSettings() {
  return valueOrThrow(useContext(SETTINGS_CONTEXT))
}

export function SettingsProvider({ children }: PropsWithChildren<unknown>) {
  const [locale, setLocale] = useLocalStorage('locale', DEFAULT_LOCALE)
  const { i18n } = useTranslation()

  const [shouldCheckIncorrectChars, setShouldCheckIncorrectChars] =
    useSessionStorage('checkIncorrectChars', true)

  const [shouldCheckIncorrectWords, setShouldCheckIncorrectWords] =
    useSessionStorage('canSubmitIncorrectWords', true)

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
        checkIncorrectChars: {
          isEnabled: shouldCheckIncorrectChars,
          toggle: () => setShouldCheckIncorrectChars(inverted),
        },
        checkIncorrectWords: {
          isEnabled: shouldCheckIncorrectWords,
          toggle: () => setShouldCheckIncorrectWords(inverted),
        },
      }}
    >
      {children}
    </SETTINGS_CONTEXT.Provider>
  )
}

function inverted(value: boolean) {
  return !value
}
