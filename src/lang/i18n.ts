import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Locale } from '../types'
import { ENGLISH_TRANSLATIONS } from './translations/en'
import { FINNISH_TRANSLATIONS } from './translations/fi'
import { SWEDISH_TRANSLATIONS } from './translations/se'

export const DEFAULT_LOCALE: Locale = 'en'

// This makes sure that all translations have the same keys
export type TranslationResource = typeof ENGLISH_TRANSLATIONS

const RESOURCES: {
  [L in Locale]: {
    translation: TranslationResource
  }
} = {
  fi: { translation: FINNISH_TRANSLATIONS },
  en: { translation: ENGLISH_TRANSLATIONS },
  se: { translation: SWEDISH_TRANSLATIONS },
}

export function initTranslations() {
  i18n.use(initReactI18next).init({
    // debug: true,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    resources: RESOURCES,
  })
}
