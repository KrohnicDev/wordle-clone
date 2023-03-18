export enum GameState {
  IN_PROGRESS = 'in progress',
  GAME_OVER = 'game over',
  PLAYER_WON = 'player won',
}

export interface INotification {
  type: 'success' | 'warning' | 'error'
  text: string
}

export enum ValidationError {
  EMPTY_WORD = 'emptyWord',
  ILLEGAL_WORD = 'invalidWord',
  TOO_SHORT = 'tooShort',
  ALREADY_GUESSED = 'alreadyGuessed',
}

export const LOCALES = ['fi', 'en', 'se'] as const

export type Locale = typeof LOCALES[number]

export function isLocale(arg: unknown): arg is Locale {
  return LOCALES.some((locale) => arg === locale)
}

export type Validation = [error: ValidationError, condition: () => boolean]
