import { useTranslation } from 'react-i18next'
import { LOCAL_CHARS } from '../../constants'
import { useGameState } from '../../hooks/useGameState'
import { useLocale } from '../../hooks/useLocale'
import './AvailableChars.css'

export function AvailableChars() {
  const { availableChars } = useGameState()
  const { locale } = useLocale()
  const { t } = useTranslation()
  const chars = LOCAL_CHARS[locale]
  return (
    <div>
      {t('availableChars') + ': '}
      {chars.map((char, i) => {
        const isForbidden = !availableChars.includes(char)
        return (
          <span
            key={char}
            className={`char ${isForbidden ? 'forbidden-char' : ''}`}
          >
            {char.toUpperCase()}
            {i === chars.length - 1 ? '' : ', '}
          </span>
        )
      })}
    </div>
  )
}
