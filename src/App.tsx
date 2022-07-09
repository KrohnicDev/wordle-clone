import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { WordleGame } from './components/WordleGame'
import { useLocale } from './hooks/useLocale'
import { isLocale, Locale } from './types'

export default function App(): JSX.Element {
  const { setLocale } = useLocale()
  const { t } = useTranslation()
  const dropdownId = useId()

  const localeDropdownMenu = (
    <div>
      <label htmlFor={dropdownId}>{t('language.select')}:</label>
      <select
        id={dropdownId}
        onChange={(e) => {
          const value = e.target.value
          if (isLocale(value)) {
            setLocale(value)
          }
        }}
      >
        <option />
        <option value={Locale.FI}>{t('language.fi')}</option>
        <option value={Locale.EN}>{t('language.en')}</option>
      </select>
    </div>
  )

  return (
    <div className='game'>
      <h1>{t('title')}</h1>
      <WordleGame />
      {localeDropdownMenu}
    </div>
  )
}
