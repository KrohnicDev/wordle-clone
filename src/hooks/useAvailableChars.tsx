import { useMemo } from 'react'
import { LOCAL_CHARS } from '../constants'
import { toCharArray } from '../utils'
import { useGameState } from './useGameState'
import { useLocale } from './useLocale'

export function useAvailableChars() {
  const { locale } = useLocale()
  const { guesses, solution } = useGameState()
  return useMemo(() => {
    const chars = LOCAL_CHARS[locale]
    const incorrectChars = guesses
      .flatMap(toCharArray)
      .filter((char) => !solution.includes(char))
    return chars.filter((char) => !incorrectChars.includes(char))
  }, [guesses, locale, solution])
}
