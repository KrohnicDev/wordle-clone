// NOTE: Values used in translations
export const WORD_ERRORS = [
  'empty-word',
  'illegal-word',
  'short-word',
  'used-word',
] as const

export const CHAR_ERRORS = ['illegal-char'] as const

export type WordErrorType = (typeof WORD_ERRORS)[number]

export type CharErrorType = (typeof CHAR_ERRORS)[number]

export type ValidationErrorType = WordErrorType | CharErrorType

export type ValidationErrorDto =
  | { type: CharErrorType; char: string }
  | { type: WordErrorType; guess: string }
