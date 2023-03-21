import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MAX_GUESSES, WORD_LENGTH } from '../constants'
import { GameState as GamePhase, ValidationErrorDto } from '../types'
import {
  isValidChar,
  selectRandomWord,
  valueOrThrow,
  withoutLastChar,
} from '../utils'
import { useGuessValidator } from './useGuessValidator'
import { useLocale } from './useLocale'
import { useWordData } from './useWordData'

export interface GameState {
  solution: string
  currentGuess: string
  guesses: string[]
  phase: GamePhase
  error?: ValidationErrorDto
  restartGame(): void
}

const GAME_CONTEXT = createContext<GameState | undefined>(undefined)

/** Provides access to global game state context */
export function useGameState() {
  return valueOrThrow(useContext(GAME_CONTEXT))
}

export function GameStateProvider({ children }: PropsWithChildren<unknown>) {
  const { locale } = useLocale()
  const [currentGuess, setCurrentGuess] = useState('')
  const [solution, setSolution] = useState({ locale, word: '' })
  const [submittedGuesses, setSubmittedGuesses] = useState<string[]>([])
  const { words, solutions, isLoading } = useWordData()

  const [error, setError] = useState<ValidationErrorDto>()
  const errorTimeout = useRef<NodeJS.Timeout>()

  const startNewGame = useCallback(() => {
    const newSolution = selectRandomWord(solutions)
    setSolution({ locale, word: newSolution })
    setSubmittedGuesses([])
    setCurrentGuess('')
    setError(undefined)
    console.log(
      `Started a new game (language: ${locale.toUpperCase()}, solution: ${newSolution.toUpperCase()})`
    )
  }, [locale, solutions])

  // Handle automatic game restarts
  useEffect(() => {
    if (isLoading) {
      console.log(`Loading ${locale.toUpperCase()} solutions...`)
    } else if (solution.word === '') {
      console.log('Starting the first game')
      startNewGame()
    } else if (solution.locale !== locale) {
      console.log('Starting a new game due to language change')
      startNewGame()
    }
  }, [isLoading, locale, solution, solutions, startNewGame])

  const validateGuess = useGuessValidator(submittedGuesses)

  // Handle keyboard input
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      const key = event.key

      if (key === 'Enter') {
        handleSubmit()
      } else if (key === 'Backspace') {
        setCurrentGuess(withoutLastChar)
      } else if (currentGuess.length >= WORD_LENGTH) {
        console.log(`Guess ${currentGuess} is at max length (${WORD_LENGTH})`)
      } else if (isValidChar(key)) {
        setCurrentGuess((guess) => guess + key.toLowerCase())
      } else {
        console.debug('Invalid character: ', key)
      }

      function handleSubmit() {
        const validationError = validateGuess(currentGuess)

        if (validationError) {
          setError({ type: validationError, guess: currentGuess })
          setCurrentGuess('')
          clearTimeout(errorTimeout.current)
          errorTimeout.current = setTimeout(() => setError(undefined), 5000)
        } else {
          setError(undefined)
          setCurrentGuess('')
          setSubmittedGuesses((previousGuesses) => [
            ...previousGuesses,
            currentGuess,
          ])
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      clearTimeout(errorTimeout.current)
    }
  }, [currentGuess, submittedGuesses, validateGuess, words])

  const context: GameState = {
    currentGuess,
    phase: determineGamePhase(solution.word, submittedGuesses),
    guesses: submittedGuesses,
    solution: solution.word,
    error,
    restartGame: startNewGame,
  }

  if (isLoading) {
    return null
  }

  return (
    <GAME_CONTEXT.Provider value={context}>{children}</GAME_CONTEXT.Provider>
  )
}

function determineGamePhase(solution: string, submittedGuesses: string[]) {
  if (submittedGuesses.includes(solution)) {
    return GamePhase.WIN
  }

  if (submittedGuesses.length === MAX_GUESSES) {
    return GamePhase.LOSE
  }

  return GamePhase.IN_PROGRESS
}
