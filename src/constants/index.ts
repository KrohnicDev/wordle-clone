import { Locale } from '../types'
import { toCharArray } from '../utils'

export const WORD_LENGTH = 5

export const MAX_GUESSES = 6

const ENGLISH_ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const FINNISH_ALPHABET = ENGLISH_ALPHABET + 'åäö'
const SWEDISH_ALPHABET = FINNISH_ALPHABET

export const LOCAL_CHARS: { [L in Locale]: string[] } = {
  fi: toCharArray(FINNISH_ALPHABET),
  en: toCharArray(ENGLISH_ALPHABET),
  se: toCharArray(SWEDISH_ALPHABET),
}
