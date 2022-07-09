export enum GameState {
  IN_PROGRESS = 'inProgress',
  GAME_OVER = 'gameOver',
  PLAYER_WON = 'playerWon',
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

export enum Locale {
  FI = 'fi',
  EN = 'en',
}

export function isLocale(arg: unknown): arg is Locale {
  return Object.values(Locale).some((locale) => arg === locale)
}

export type Validation = [error: ValidationError, condition: () => boolean]
