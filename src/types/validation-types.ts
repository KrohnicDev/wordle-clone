// NOTE: Values used in translations
export type ValidationErrorType =
  | 'empty-word'
  | 'illegal-word'
  | 'short-word'
  | 'used-word'
  | 'illegal-char'

export interface ValidationErrorDto {
  type: ValidationErrorType
  guess?: string
  char?: string
}
