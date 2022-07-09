import { UNIVERSAL_TRANSLATIONS } from './universal'

export const ENGLISH_TRANSLATIONS = {
  title: 'Wordle Clone',
  language: {
    select: 'Please select a language',
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
      playerWon: 'Congratulations! You won!',
      gameOver: 'You lose! Solution was {{ solution }}.',
    },
  },
}
