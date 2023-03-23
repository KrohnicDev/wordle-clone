import { Locale } from '../types'
import { toCharArray } from '../utils'

export const WORD_LENGTH = 5

export const MAX_GUESSES = 6

const ENGLISH_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const FINNISH_LETTERS = ENGLISH_LETTERS + 'åäö'
const SWEDISH_LETTERS = FINNISH_LETTERS

export const LETTERS: { [L in Locale]: string[] } = {
  fi: toCharArray(FINNISH_LETTERS),
  en: toCharArray(ENGLISH_LETTERS),
  se: toCharArray(SWEDISH_LETTERS),
}
