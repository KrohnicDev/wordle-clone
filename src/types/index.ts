import { ValidationErrorDto } from './validation-types'

export * from './locale-types'
export * from './validation-types'
export * from './settings-types'

// NOTE: Values used in translations
export type GamePhase = 'in-progress' | 'lose' | 'win'

export interface GameState {
  solution: string
  currentGuess: string
  guesses: string[]
  phase: GamePhase
  availableChars: string[]
  error?: ValidationErrorDto
}

export interface INotification {
  type: 'success' | 'warning' | 'error'
  text: string
}
