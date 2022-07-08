import { useState } from 'react'
import './App.css'
import { WordleGame } from './components/WordleGame'
import { Locale } from './types'

export default function App(): JSX.Element {
  const [locale, setLocale] = useState<Locale>()
  return (
    <div className='game'>
      <h1>Wordle Clone</h1>

      {locale ? (
        <WordleGame locale={locale} />
      ) : (
        <div>
          <select onChange={(e) => setLocale(e.target.value as Locale)}>
            <option selected>Please select a language</option>
            <option value={Locale.FI}>Suomi</option>
            <option value={Locale.EN}>English</option>
          </select>
        </div>
      )}
    </div>
  )
}
