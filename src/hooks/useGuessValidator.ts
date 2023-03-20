import { useCallback, useMemo } from 'react'
import { WORD_LENGTH } from '../constants'
import { ValidationError, Validator } from '../types'
import { useWordData } from './useWordData'

export function useGuessValidator(previousGuesses: string[]) {
  const { words } = useWordData()
  const validators: Validator[] = useMemo(
    () => [
      [ValidationError.EMPTY_WORD, (w) => w.length === 0],
      [ValidationError.TOO_SHORT, (w) => w.length < WORD_LENGTH],
      [ValidationError.ALREADY_GUESSED, (w) => previousGuesses.includes(w)],
      [ValidationError.ILLEGAL_WORD, (w) => !words.includes(w)],
    ],
    [previousGuesses, words]
  )

  return useCallback(
    (guess: string) => {
      for (const [error, isInvalid] of validators) {
        if (isInvalid(guess)) {
          return error
        }
      }
      return undefined
    },
    [validators]
  )
}
