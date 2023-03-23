import { UNIVERSAL_TRANSLATIONS } from './universal'

export const ENGLISH_TRANSLATIONS = {
  title: 'Wordle Clone',
  availableChars: 'Available characters',
  language: {
    select: 'Select language',
    ...UNIVERSAL_TRANSLATIONS.language,
  },
  errors: {
    validation: {
      emptyWord: 'Word must not be empty',
      invalidWord: `{{ word }} is not a valid word`,
      tooShort: `Word {{ word }} is too short ({{ actualLength }}/{{ requiredLength }} characters)`,
      alreadyGuessed: `Word {{ word }} has already been guessed`,
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
