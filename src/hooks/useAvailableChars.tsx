import { useMemo } from 'react'
import { LETTERS } from '../constants'
import { toCharArray } from '../utils'
import { useLocale } from './useLocale'
import { useGameState } from './useGameState'

export function useAvailableChars() {
  const { locale } = useLocale()
  const { guesses, solution } = useGameState()
  return useMemo(() => {
    const chars = LETTERS[locale]
    const incorrectChars = guesses
      .flatMap(toCharArray)
      .filter((char) => !solution.includes(char))
    return chars.filter((char) => !incorrectChars.includes(char))
  }, [guesses, locale, solution])
}
