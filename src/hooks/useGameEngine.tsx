import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { WORD_LENGTH } from '../constants'
import { GameState, ValidationErrorDto } from '../types'
import {
  isValidChar,
  selectRandomWord,
  valueOrThrow,
  withoutLastChar,
} from '../utils'
import { useGuessValidator } from './useGuessValidator'
import { useLocale } from './useLocale'
import { useWordData } from './useWordData'

export interface GameContext extends Omit<GameState, 'phase'> {
  restartGame(): void
  addValidationError(error: ValidationErrorDto): void
}

const GAME_CONTEXT = createContext<GameContext | undefined>(undefined)

/** Provides access to the game state and functions */
export function useGameEngine() {
  return valueOrThrow(useContext(GAME_CONTEXT))
}

export function GameProvider({ children }: PropsWithChildren<unknown>) {
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

  const addError = useCallback((error: ValidationErrorDto) => {
    clearTimeout(errorTimeout.current)
    setError(error)
    errorTimeout.current = setTimeout(() => setError(undefined), 5000)
  }, [])

  // Handle automatic game restarts
  useEffect(() => {
    if (isLoading) {
      console.log(`Loading ${locale.toUpperCase()} solutions...`)
      return
    }

    if (solution.word === '') {
      console.log('Starting the first game')
      startNewGame()
      return
    }

    if (solution.locale !== locale) {
      console.log('Starting a new game due to language change')
      startNewGame()
      return
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
        setCurrentGuess('')
        const validationError = validateGuess(currentGuess)

        if (validationError) {
          addError({ type: validationError, guess: currentGuess })
        } else {
          setError(undefined)
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
  }, [addError, currentGuess, submittedGuesses, validateGuess, words])

  const context: GameContext = {
    currentGuess,
    guesses: submittedGuesses,
    solution: solution.word,
    error,
    restartGame: startNewGame,
    addValidationError: addError,
  }

  return (
    <GAME_CONTEXT.Provider value={context}>{children}</GAME_CONTEXT.Provider>
  )
}
