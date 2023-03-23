// NOTE: Values used in translations
export type ValidationError =
  | 'empty-word'
  | 'illegal-word'
  | 'short-word'
  | 'used-word'
  | 'illegal-char'

export interface ValidationErrorDto {
  type: ValidationError
  guess?: string
  char?: string
}

export type Validator = [
  error: ValidationError,
  condition: (guess: string) => boolean
]
