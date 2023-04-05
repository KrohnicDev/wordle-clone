import { useCallback, useMemo } from 'react'
import { WORD_LENGTH } from '../constants'
import { ValidationErrorDto, WordErrorType, WORD_ERRORS } from '../types'
import { toCharArray } from '../utils'
import { useSettings } from './useSettings'
import { useWordData } from './useWordData'

type GuessValidator = (guess: string) => ValidationErrorDto | undefined

export function useGuessValidator({
  previousGuesses,
  availableChars,
}: {
  previousGuesses: string[]
  availableChars: string[]
}): GuessValidator {
  const { words } = useWordData()
  const { checkIncorrectWords, checkIncorrectChars } = useSettings()

  const errorDefinitions: {
    [T in WordErrorType]: (guess: string) => boolean
  } = useMemo(
    () => ({
      'empty-word': (w) => w.length === 0,
      'short-word': (w) => w.length < WORD_LENGTH,
      'used-word': (w) => previousGuesses.includes(w),
      'illegal-word': (w) =>
        checkIncorrectWords.isEnabled && !words.includes(w),
    }),
    [checkIncorrectWords.isEnabled, previousGuesses, words]
  )

  return useCallback(
    (guess) => {
      const wordErrors: ValidationErrorDto[] = WORD_ERRORS.filter((type) => {
        const hasError = errorDefinitions[type]
        return hasError(guess)
      }).map((type) => ({ type, guess }))

      if (wordErrors.length > 0) {
        return wordErrors[0]
      }

      const charErrors: ValidationErrorDto[] = checkIncorrectChars.isEnabled
        ? toCharArray(guess)
            .filter((char) => !availableChars.includes(char))
            .map((char) => ({ type: 'illegal-char', char }))
        : []

      if (charErrors.length > 0) {
        return charErrors[0]
      }

      return undefined
    },
    [availableChars, checkIncorrectChars.isEnabled, errorDefinitions]
  )
}
