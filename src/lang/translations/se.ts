import { TranslationResource } from '../i18n'
import { UNIVERSAL_TRANSLATIONS } from './universal'

export const SWEDISH_TRANSLATIONS: TranslationResource = {
  title: 'Wordle Replika',
  availableChars: 'todo',
  language: {
    ...UNIVERSAL_TRANSLATIONS.language,
    select: 'Välj språk',
  },
  errors: {
    validation: {
      'empty-word': 'Ordet får inte vara tomt',
      'illegal-word': '{{ word }} är inte ett tillåtet ord',
      'short-word':
        'Ordet {{ word }} är för kort ({{ actualLength }}/{{ requiredLength }} bokstäver)',
      'used-word': 'Ordet {{ word }} har redan gissat',
      'illegal-char': 'TODO',
    },
  },
  notifications: {
    status: {
      win: 'Grattis! Du vann spelet!',
      lose: 'Du förlorade spelet! Det rätta ordet skulle ha varit {{ solution }}.',
    },
  },
  buttons: {
    restartGame: 'Starta om spelet',
  },
}
