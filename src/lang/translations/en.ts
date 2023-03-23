import { UNIVERSAL_TRANSLATIONS } from './universal'

export const ENGLISH_TRANSLATIONS = {
  title: 'Wordle Clone',
  availableChars: 'Available characters',
  language: {
    ...UNIVERSAL_TRANSLATIONS.language,
    select: 'Select language',
  },
  errors: {
    validation: {
      'empty-word': 'Word must not be empty',
      'illegal-word': `{{ word }} is not a valid word`,
      'short-word': `Word {{ word }} is too short ({{ actualLength }}/{{ requiredLength }} characters)`,
      'used-word': `Word {{ word }} has already been guessed`,
      'illegal-char': 'Invalid character: {{ char }}',
    },
  },
  notifications: {
    status: {
      win: 'Congratulations! You won!',
      lose: 'You lose! Solution was {{ solution }}.',
    },
  },
  buttons: {
    restartGame: 'Restart game',
  },
}
