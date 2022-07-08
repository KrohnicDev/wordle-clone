export enum GameState {
  IN_PROGRESS,
  GAME_OVER,
  PLAYER_WON,
}

export interface INotification {
  type: 'success' | 'warning' | 'error'
  text: string
}

export enum GuessError {
  INVALID_WORD = `{1} is not a valid word`,
  TOO_SHORT = `Word {1} is too short ({2}/{3} characters)`,
  ALREADY_GUESSED = `Word {1} has already been guessed`,
}

export enum Locale {
  FI = 'fi',
  EN = 'en',
}
