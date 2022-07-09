import { useTranslation } from 'react-i18next'
import './App.css'
import { WordleGame } from './components/WordleGame'
import { useLocale } from './hooks/useLocale'
import { Locale } from './types'

export default function App(): JSX.Element {
  const { locale, setLocale } = useLocale()
  const { t } = useTranslation()

  const localeDropdownMenu = (
    <select onChange={(e) => setLocale(e.target.value as Locale)}>
      <option>{t('language.select')}</option>
      <option value={Locale.FI}>{t('language.fi')}</option>
      <option value={Locale.EN}>{t('language.en')}</option>
    </select>
  )

  return (
    <div className='game'>
      <h1>{t('title')}</h1>
      {locale ? <WordleGame locale={locale} /> : localeDropdownMenu}
    </div>
  )
}
