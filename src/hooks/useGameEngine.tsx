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
import { GameState, Locale, ValidationErrorDto } from '../types'
import {
  selectRandomWord,
  toCharArray,
  valueOrThrow,
  withoutLastChar,
} from '../utils'
import { useGuessValidator } from './useGuessValidator'
import { useKeyboardEvents } from './useKeyboardEvents'
import { useCurrentLocale } from './useLocale'
import { useLocalStorage } from './useLocalStorage'
import { useSettings } from './useSettings'
import { useWordData } from './useWordData'

export type GameContext = Omit<GameState, 'phase'> & {
  restartGame(): void
}

const GAME_CONTEXT = createContext<GameContext | undefined>(undefined)

/** Provides access to the game state and functions */
export function useGameEngine() {
  return valueOrThrow(useContext(GAME_CONTEXT))
}

type LocalizedWord = { locale: Locale; word: string }

export function GameProvider({ children }: PropsWithChildren<unknown>) {
  const { solutions } = useWordData()
  const locale = useCurrentLocale()
  const { checkIncorrectChars } = useSettings()

  const [currentGuess, setCurrentGuess] = useState('')
  const [submittedGuesses, setSubmittedGuesses] = useLocalStorage<string[]>(
    'submittedGuesses',
    []
  )
  const [solution, setSolution] = useLocalStorage<LocalizedWord>('solution', {
    locale,
    word: '',
  })
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
  }, [
    locale,
    setCurrentGuess,
    setSolution,
    setSubmittedGuesses,
    setValidationError,
    solutions,
  ])

  useAutomaticGameRestarts(solution, startNewGame)

  const availableChars = useMemo(() => {
    const chars = LOCAL_CHARS[locale]
    const incorrectChars = submittedGuesses
      .flatMap(toCharArray)
      .filter((char) => !solution.word.includes(char))
    return chars.filter((char) => !incorrectChars.includes(char))
  }, [submittedGuesses, locale, solution])

  const validateGuess = useGuessValidator({
    previousGuesses: submittedGuesses,
    availableChars,
  })

  useKeyboardEvents({
    onCharInput: (char) => {
      if (currentGuess.length >= WORD_LENGTH) {
        console.log(`Guess ${currentGuess} is at max length (${WORD_LENGTH})`)
        return
      }

      setCurrentGuess((guess) => guess + char.toLowerCase())
    },
    onBackspace: () => setCurrentGuess(withoutLastChar),
    onSubmit: () => {
      const error = validateGuess(currentGuess)

      if (error) {
        setValidationError(error)
        return
      }

      setValidationError(undefined)
      setCurrentGuess('')
      setSubmittedGuesses((previousGuesses) => [
        ...previousGuesses,
        currentGuess,
      ])
    },
  })

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

/** Handles automatic game restarts (e.g. on first load and on locale change) */
function useAutomaticGameRestarts(
  solution: LocalizedWord,
  startNewGame: () => void
) {
  const { isLoading } = useWordData()
  const locale = useCurrentLocale()

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
  }, [isLoading, locale, solution, startNewGame])
}
