import { Translations } from '../i18n'
import { UNIVERSAL_TRANSLATIONS } from './universal'

export const FINNISH_TRANSLATIONS: Translations = {
  title: 'Wordle-kopio',
  language: {
    select: 'Valitse kieli',
    ...UNIVERSAL_TRANSLATIONS.language,
  },
  errors: {
    validation: {
      emptyWord: 'Sana ei saa olla tyhjä',
      invalidWord: '{{ word }} ei ole sallittu sana',
      tooShort:
        'Sana {{ word }} on liian lyhyt ({{ actualLength }}/{{ requiredLength }} merkkiä)',
      alreadyGuessed: 'Sana {{ word }} on jo arvattu',
    },
  },
  notifications: {
    status: {
      playerWon: 'Onnittelut! Voitit pelin!',
      gameOver: 'Hävisit pelin! Oikea sana olisi ollut {{ solution }}.',
    },
  },
  buttons: {
    restartGame: 'Uusi peli',
  },
}
