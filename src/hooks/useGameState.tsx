import { useMemo } from 'react'
import { MAX_GUESSES } from '../constants'
import { GamePhase, GameState } from '../types'
import { useGameEngine } from './useGameEngine'

/** Provides access to global game state */
export function useGameState(): GameState {
  const { currentGuess, guesses, solution, error } = useGameEngine()

  const phase: GamePhase = useMemo(() => {
    if (guesses.includes(solution)) {
      return 'win'
    }
    if (guesses.length >= MAX_GUESSES) {
      return 'lose'
    }
    return 'in-progress'
  }, [guesses, solution])

  return {
    currentGuess,
    guesses,
    solution,
    phase,
    error,
  }
}
