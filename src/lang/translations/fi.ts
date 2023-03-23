import { TranslationResource } from '../i18n'
import { UNIVERSAL_TRANSLATIONS } from './universal'

export const FINNISH_TRANSLATIONS: TranslationResource = {
  title: 'Wordle-kopio',
  availableChars: 'Sallitut kirjaimet',
  language: {
    select: 'Valitse kieli',
    ...UNIVERSAL_TRANSLATIONS.language,
  },
  errors: {
    validation: {
      'empty-word': 'Sana ei saa olla tyhjä',
      'illegal-word': 'Virheellinen sana: {{ word }}',
      'illegal-char': 'Virheellinen kirjain: {{ char }}',
      'short-word':
        'Sana {{ word }} on liian lyhyt ({{ actualLength }}/{{ requiredLength }} merkkiä)',
      'used-word': 'Sana {{ word }} on jo arvattu',
    },
  },
  notifications: {
    status: {
      win: 'Onnittelut! Voitit pelin!',
      lose: 'Hävisit pelin! Oikea sana olisi ollut {{ solution }}.',
    },
  },
  buttons: {
    restartGame: 'Aloita alusta',
  },
}
