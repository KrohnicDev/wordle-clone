import { useMemo } from 'react'
import { MAX_GUESSES } from '../constants'
import { GamePhase, GameState } from '../types'
import { match } from '../utils'
import { useGameEngine } from './useGameEngine'

/** Provides access to global game state */
export function useGameState(): GameState {
  const { guesses, solution, ...rest } = useGameEngine()

  const phase: GamePhase = useMemo(
    () =>
      match(
        [() => guesses.includes(solution), 'win'],
        [() => guesses.length >= MAX_GUESSES, 'lose']
      ) ?? 'in-progress',
    [guesses, solution]
  )

  return {
    guesses,
    phase,
    solution,
    ...rest,
  }
}
