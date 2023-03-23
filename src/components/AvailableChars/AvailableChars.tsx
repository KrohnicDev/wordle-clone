import { LETTERS } from '../../constants'
import { useAvailableChars } from '../../hooks/useAvailableChars'
import { useLocale } from '../../hooks/useLocale'
import './AvailableChars.css'

export function AvailableChars() {
  const availableChars = useAvailableChars()
  const { locale } = useLocale()
  const chars = LETTERS[locale]
  return (
    <div>
      {chars.map((char) => {
        const isForbidden = !availableChars.includes(char)
        return (
          <span
            key={char}
            className={`char ${isForbidden ? 'forbidden-char' : ''}`}
          >
            {char.toUpperCase()}{' '}
          </span>
        )
      })}
    </div>
  )
}
