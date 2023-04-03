import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { LOCAL_CHARS, WORD_LENGTH } from '../constants'
import { GameState, ValidationErrorDto } from '../types'
import {
  selectRandomWord,
  toCharArray,
  valueOrThrow,
  withoutLastChar,
} from '../utils'
import { useGuessValidator } from './useGuessValidator'
import { useKeyboardEvents } from './useKeyboardEvents'
import { useLocale } from './useLocale'
import { useWordData } from './useWordData'

export interface GameContext extends Omit<GameState, 'phase'> {
  restartGame(): void
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

  const [validationError, setValidationError] = useValidationError()

  const startNewGame = useCallback(() => {
    const newSolution = selectRandomWord(solutions)
    setSolution({ locale, word: newSolution })
    setSubmittedGuesses([])
    setCurrentGuess('')
    setValidationError(undefined)
    console.log(
      `Started a new game (language: ${locale.toUpperCase()}, solution: ${newSolution.toUpperCase()})`
    )
  }, [locale, setValidationError, solutions])

  const availableChars = useMemo(() => {
    const chars = LOCAL_CHARS[locale]
    const incorrectChars = submittedGuesses
      .flatMap(toCharArray)
      .filter((char) => !solution.word.includes(char))
    return chars.filter((char) => !incorrectChars.includes(char))
  }, [submittedGuesses, locale, solution])

  const validateGuess = useGuessValidator(submittedGuesses)

  useKeyboardEvents({
    onCharInput: (char) => {
      if (currentGuess.length >= WORD_LENGTH) {
        console.log(`Guess ${currentGuess} is at max length (${WORD_LENGTH})`)
        return
      }

      if (!availableChars.includes(char)) {
        // Allow character input but show warning
        setValidationError({ type: 'illegal-char', char })
      }

      setCurrentGuess((guess) => guess + char.toLowerCase())
    },
    onBackspace: () => setCurrentGuess(withoutLastChar),
    onSubmit: () => {
      const error = validateGuess(currentGuess)
      setValidationError(error)
      setCurrentGuess('')

      if (error === undefined) {
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
    availableChars,
    restartGame: startNewGame,
  }

  return (
    <GAME_CONTEXT.Provider value={context}>{children}</GAME_CONTEXT.Provider>
  )
}

/** Handles automatic error clearing after delay */
function useValidationError() {
  const [error, _setError] = useState<ValidationErrorDto>()
  const timeout = useRef<NodeJS.Timeout>()

  const setError = useCallback((error: ValidationErrorDto | undefined) => {
    _setError(error)

    if (error) {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setError(undefined), 5000)
    }
  }, [])

  return [error, setError] as const
}
