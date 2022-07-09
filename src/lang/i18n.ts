import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { ENGLISH_TRANSLATIONS } from './translations/en'
import { FINNISH_TRANSLATIONS } from './translations/fi'
import { Locale } from '../types'

// This makes sure that other translations have the same keys
export type Translations = typeof ENGLISH_TRANSLATIONS

export function initTranslations() {
  i18n.use(initReactI18next).init({
    fallbackLng: Locale.EN,
    resources: {
      en: { translation: ENGLISH_TRANSLATIONS },
      fi: { translation: FINNISH_TRANSLATIONS },
    },
  })
}
