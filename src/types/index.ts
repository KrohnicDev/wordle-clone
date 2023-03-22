// NOTE: Values used in translations
export type GamePhase = 'in-progress' | 'lose' | 'win'

export interface INotification {
  type: 'success' | 'warning' | 'error'
  text: string
}

// NOTE: Values used in translations
export enum ValidationError {
  EMPTY_WORD = 'emptyWord',
  ILLEGAL_WORD = 'invalidWord',
  TOO_SHORT = 'tooShort',
  ALREADY_GUESSED = 'alreadyGuessed',
}

export interface ValidationErrorDto {
  type: ValidationError
  guess: string
}

export type Validator = [
  error: ValidationError,
  condition: (guess: string) => boolean
]

export const LOCALES = ['fi', 'en', 'se'] as const

export type Locale = (typeof LOCALES)[number]

export function isLocale(arg: unknown): arg is Locale {
  return LOCALES.some((locale) => arg === locale)
}
