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
import { selectRandomWord, valueOrThrow, withoutLastChar } from '../utils'
import { useGuessValidator } from './useGuessValidator'
import { useKeyboardInput } from './useKeyboardInput'
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
  const { solutions, isLoading } = useWordData()

  const [currentGuess, setCurrentGuess] = useState('')
  const [solution, setSolution] = useState({ locale, word: '' })
  const [submittedGuesses, setSubmittedGuesses] = useState<string[]>([])

  const [validationError, setValidationError] = useState<ValidationErrorDto>()
  const errorTimeout = useRef<NodeJS.Timeout>()

  const startNewGame = useCallback(() => {
    const newSolution = selectRandomWord(solutions)
    setSolution({ locale, word: newSolution })
    setSubmittedGuesses([])
    setCurrentGuess('')
    setValidationError(undefined)
    console.log(
      `Started a new game (language: ${locale.toUpperCase()}, solution: ${newSolution.toUpperCase()})`
    )
  }, [locale, solutions])

  const addValidationError = useCallback((error: ValidationErrorDto) => {
    clearTimeout(errorTimeout.current)
    setValidationError(error)
    errorTimeout.current = setTimeout(() => setValidationError(undefined), 5000)
  }, [])

  const validateGuess = useGuessValidator(submittedGuesses)

  useKeyboardInput({
    onCharInput: (char) => {
      if (currentGuess.length >= WORD_LENGTH) {
        console.log(`Guess ${currentGuess} is at max length (${WORD_LENGTH})`)
      } else {
        setCurrentGuess((guess) => guess + char.toLowerCase())
      }
    },

    onBackspace: () => setCurrentGuess(withoutLastChar),

    onSubmit: () => {
      setCurrentGuess('')
      const error = validateGuess(currentGuess)

      if (error) {
        addValidationError(error)
      } else {
        setValidationError(undefined)
        setSubmittedGuesses((previousGuesses) => [
          ...previousGuesses,
          currentGuess,
        ])
      }
    },
  })

  // Handle automatic game restarts (e.g. on first load and on locale change)
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

  const context: GameContext = {
    currentGuess,
    guesses: submittedGuesses,
    solution: solution.word,
    error: validationError,
    restartGame: startNewGame,
    addValidationError,
  }

  return (
    <GAME_CONTEXT.Provider value={context}>{children}</GAME_CONTEXT.Provider>
  )
}
