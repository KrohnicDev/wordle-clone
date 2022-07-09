import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Locale } from '../types'
import { ENGLISH_TRANSLATIONS } from './translations/en'
import { FINNISH_TRANSLATIONS } from './translations/fi'

export const DEFAULT_LOCALE = Locale.EN

// This makes sure that all translations have the same keys
export type Translations = typeof ENGLISH_TRANSLATIONS

export function initTranslations() {
  i18n.use(initReactI18next).init({
    // debug: true,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    resources: {
      en: { translation: ENGLISH_TRANSLATIONS },
      fi: { translation: FINNISH_TRANSLATIONS },
    },
  })
}
