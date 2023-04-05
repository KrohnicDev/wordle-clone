import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'
import { Locale, isLocale, LOCALES } from '../../types'

export function LocaleSelect() {
  const { locale } = useSettings()
  const { t } = useTranslation()
  const label = t('settings.language.select')

  function handleChange(e: SelectChangeEvent<Locale>) {
    const value = e.target.value
    if (isLocale(value)) {
      locale.set(value)
    } else {
      console.error('Unexpected locale', value)
    }
  }

  return (
    <MenuItem>
      {label}
      <Select
        label={label}
        onChange={handleChange}
        value={locale.value}
        className='language-select'
      >
        {LOCALES.map((it) => (
          <MenuItem value={it} key={it}>
            {t(`settings.language.${it}`)}
          </MenuItem>
        ))}
      </Select>
    </MenuItem>
  )
}
