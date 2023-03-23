import { useCallback, useMemo } from 'react'
import { WORD_LENGTH } from '../constants'
import { ValidationError, Validator } from '../types'
import { useWordData } from './useWordData'

export function useGuessValidator(
  previousGuesses: string[]
): (guess: string) => ValidationError | undefined {
  const { words } = useWordData()

  const validators: Validator[] = useMemo(
    () => [
      ['empty-word', (w) => w.length === 0],
      ['short-word', (w) => w.length < WORD_LENGTH],
      ['used-word', (w) => previousGuesses.includes(w)],
      ['illegal-word', (w) => !words.includes(w)],
    ],
    [previousGuesses, words]
  )

  return useCallback(
    (guess) => {
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
