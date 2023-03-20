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
import { GameState, ValidationErrorDto } from '../types'
import {
  isValidChar,
  selectRandomWord,
  valueOrThrow,
  withoutLastChar,
} from '../utils'
import { useGuessValidator } from './useGuessValidator'
import { useWordData } from './useWordData'

export interface UseWordle {
  solution: string
  currentGuess: string
  guesses: string[]
  gameState: GameState
  error?: ValidationErrorDto
  restartGame(): void
}

const WORDLE_CONTEXT = createContext<UseWordle | undefined>(undefined)

/** Provides access to global game state context */
export function useWordleGame() {
  return valueOrThrow(useContext(WORDLE_CONTEXT))
}

export function GameProvider({ children }: PropsWithChildren<unknown>) {
  const [currentGuess, setCurrentGuess] = useState('')
  const [solution, setSolution] = useState('')
  const [submittedGuesses, setSubmittedGuesses] = useState<string[]>([])
  const { words, solutions } = useWordData()

  const [error, setError] = useState<ValidationErrorDto>()
  const errorTimeout = useRef<NodeJS.Timeout>()

  const validateGuess = useGuessValidator(submittedGuesses)

  const restartGame = useCallback(() => {
    setSubmittedGuesses([])
    clearCurrentGuess()
    clearValidationError()

    if (solutions.length > 0) {
      const newSolution = selectRandomWord(solutions)
      console.log('Solution:', newSolution)
      setSolution(newSolution)
    }
  }, [solutions])

  // Handle keyboard input
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      const key = event.key

      if (key === 'Enter') {
        handleSubmit()
      } else if (key === 'Backspace') {
        setCurrentGuess(withoutLastChar)
      } else if (currentGuess.length >= WORD_LENGTH) {
        console.log(
          `Guess ${currentGuess} is already at max length (${WORD_LENGTH})`
        )
      } else if (isValidChar(key)) {
        setCurrentGuess((guess) => guess + key.toLowerCase())
      } else {
        console.log('Invalid character: ', key)
      }

      function handleSubmit() {
        const validationError = validateGuess(currentGuess)

        if (validationError) {
          setError({ type: validationError, guess: currentGuess })
          clearCurrentGuess()
          clearTimeout(errorTimeout.current)
          errorTimeout.current = setTimeout(clearValidationError, 5000)
        } else {
          clearValidationError()
          clearCurrentGuess()
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

  function clearCurrentGuess(): void {
    setCurrentGuess('')
  }

  function clearValidationError(): void {
    setError(undefined)
  }

  function determineGameState() {
    if (submittedGuesses.includes(solution)) {
      return GameState.WIN
    }

    if (submittedGuesses.length === MAX_GUESSES) {
      return GameState.LOSE
    }

    return GameState.IN_PROGRESS
  }

  const context: UseWordle = {
    currentGuess,
    gameState: determineGameState(),
    guesses: submittedGuesses,
    solution,
    error,
    restartGame,
  }

  return (
    <WORDLE_CONTEXT.Provider value={context}>
      {children}
    </WORDLE_CONTEXT.Provider>
  )
}
