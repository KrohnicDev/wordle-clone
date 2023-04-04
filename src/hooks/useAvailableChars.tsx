import { useMemo } from 'react'
import { LOCAL_CHARS } from '../constants'
import { Locale } from '../types'
import { toCharArray } from '../utils'
import { useGameState } from './useGameState'
import { useCurrentLocale } from './useLocale'

export function useAvailableChars() {
  const locale = useCurrentLocale()
  const { guesses, solution } = useGameState()
  return useMemo(
    () => determineAvailableChars({ locale, guesses, solution }),
    [guesses, locale, solution]
  )
}

export function determineAvailableChars({
  locale,
  guesses,
  solution,
}: {
  locale: Locale
  guesses: string[]
  solution: string
}) {
  const chars = LOCAL_CHARS[locale]
  const incorrectChars = guesses
    .flatMap(toCharArray)
    .filter((char) => !solution.includes(char))
  return chars.filter((char) => !incorrectChars.includes(char))
}
