import { useCallback, useMemo } from 'react'
import { WORD_LENGTH } from '../constants'
import { ValidationErrorDto, WordErrorType, WORD_ERRORS } from '../types'
import { useWordData } from './useWordData'

type GuessValidator = (guess: string) => ValidationErrorDto | undefined

type WordErrorDefinitions = {
  [T in WordErrorType]: (guess: string) => boolean
}

export function useGuessValidator(previousGuesses: string[]): GuessValidator {
  const { words } = useWordData()

  const errorDefinitions: WordErrorDefinitions = useMemo(
    () => ({
      'empty-word': (w) => w.length === 0,
      'short-word': (w) => w.length < WORD_LENGTH,
      'used-word': (w) => previousGuesses.includes(w),
      'illegal-word': (w) => !words.includes(w),
    }),
    [previousGuesses, words]
  )

  return useCallback(
    (guess) =>
      WORD_ERRORS.filter((type) => {
        const hasError = errorDefinitions[type]
        return hasError(guess)
      }).map((type) => ({ type, guess }))[0],
    [errorDefinitions]
  )
}
