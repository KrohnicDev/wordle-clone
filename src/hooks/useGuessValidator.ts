import { useCallback, useMemo } from 'react'
import { WORD_LENGTH } from '../constants'
import { ValidationErrorDto, ValidationErrorType } from '../types'
import { useWordData } from './useWordData'

type ErrorDefinition = [
  condition: (guess: string) => boolean,
  type: ValidationErrorType
]

type Validator = (guess: string) => ValidationErrorDto | undefined

export function useGuessValidator(previousGuesses: string[]): Validator {
  const { words } = useWordData()

  const errorDefinitions: ErrorDefinition[] = useMemo(
    () => [
      [(w) => w.length === 0, 'empty-word'],
      [(w) => w.length < WORD_LENGTH, 'short-word'],
      [(w) => previousGuesses.includes(w), 'used-word'],
      [(w) => !words.includes(w), 'illegal-word'],
    ],
    [previousGuesses, words]
  )

  return useCallback(
    (guess) => {
      for (const [isError, errorType] of errorDefinitions) {
        if (isError(guess)) {
          return { type: errorType, guess }
        }
      }
      return undefined
    },
    [errorDefinitions]
  )
}
