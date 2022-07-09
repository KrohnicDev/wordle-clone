import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Locale } from '../types'

export function useLocale() {
  const [locale, setLocale] = useState<Locale>()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [i18n, locale])

  return { locale, setLocale }
}
