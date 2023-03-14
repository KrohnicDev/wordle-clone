import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocale } from '../../hooks/useLocale'
import { isLocale, Locale } from '../../types'

export function LocaleSelect() {
  const { locale, setLocale } = useLocale()
  const { t } = useTranslation()

  function handleChange(e: SelectChangeEvent<Locale>) {
    const value = e.target.value
    if (isLocale(value)) {
      setLocale(value)
    } else {
      console.error('Unexpected locale', value)
    }
  }

  return (
    <Select label={t('language.select')} onChange={handleChange} value={locale}>
      <MenuItem value={Locale.FI}>{t('language.fi')}</MenuItem>
      <MenuItem value={Locale.EN}>{t('language.en')}</MenuItem>
    </Select>
  )
}
