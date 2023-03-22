import { TranslationResource } from '../i18n'
import { UNIVERSAL_TRANSLATIONS } from './universal'

export const SWEDISH_TRANSLATIONS: TranslationResource = {
  title: 'Wordle Replika',
  language: {
    select: 'Välj språk',
    ...UNIVERSAL_TRANSLATIONS.language,
  },
  errors: {
    validation: {
      emptyWord: 'Ordet får inte vara tomt',
      invalidWord: '{{ word }} är inte ett tillåtet ord',
      tooShort:
        'Ordet {{ word }} är för kort ({{ actualLength }}/{{ requiredLength }} bokstäver)',
      alreadyGuessed: 'Ordet {{ word }} har redan gissat',
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
