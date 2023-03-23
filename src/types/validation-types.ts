// NOTE: Values used in translations
export enum ValidationError {
  EMPTY_WORD = 'emptyWord',
  ILLEGAL_WORD = 'invalidWord',
  TOO_SHORT = 'tooShort',
  ALREADY_GUESSED = 'alreadyGuessed',
  INVALID_CHARACTER = 'invalidChar',
}

export interface ValidationErrorDto {
  type: ValidationError
  guess?: string
  char?: string
}

export type Validator = [
  error: ValidationError,
  condition: (guess: string) => boolean
]