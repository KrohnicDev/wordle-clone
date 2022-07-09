import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { MAX_GUESSES, WORD_LENGTH } from '../contants'
import {
  GameState,
  INotification,
  Locale,
  Validation,
  ValidationError,
} from '../types'
import { getRandomWord, isValidChar, withoutLastChar } from '../utils'

export interface UseWordle {
  solution: string
  currentGuess: string
  guesses: string[]
  gameState: GameState
  notification: INotification | undefined
  restartGame(): void
}

export function useWordle(locale: Locale): UseWordle {
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<string[]>([])
  const [solution, setSolution] = useState('')
  const [validationError, setValidationError] = useState<INotification>()
  const { t } = useTranslation()
  const { data: words = [] } = useQuery(
    `words-${locale}`,
    () => fetchWords(locale),
    { onSuccess: (words) => setSolution(getRandomWord(words)) }
  )
  const gameState = computeGameState(guesses, solution)
  const notificationTimeout = useRef<NodeJS.Timeout>()

  // Handle keyboard input
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      const key = event.key

      if (isValidChar(currentGuess, key)) {
        setCurrentGuess((guess) => guess.concat(key.toLowerCase()))
      } else if (key === 'Enter') {
        handleWordSubmit()
      } else if (key === 'Backspace') {
        setCurrentGuess(withoutLastChar)
      }
    }

    function handleWordSubmit(): void {
      const error = validateCurrentGuess()

      if (error) {
        resetCurrentGuess()
        setValidationError({ type: 'warning', text: getErrorMessage(error) })
        clearTimeout(notificationTimeout.current)
        notificationTimeout.current = setTimeout(clearValidationError, 5000)
      } else {
        setGuesses((previousGuesses) => [...previousGuesses, currentGuess])
        clearValidationError()
        resetCurrentGuess()
      }
    }

    function validateCurrentGuess(): ValidationError | void {
      const validators: Validation[] = [
        [ValidationError.EMPTY_WORD, () => currentGuess.length === 0],
        [ValidationError.TOO_SHORT, () => currentGuess.length < WORD_LENGTH],
        [ValidationError.ALREADY_GUESSED, () => guesses.includes(currentGuess)],
        [ValidationError.ILLEGAL_WORD, () => !words.includes(currentGuess)],
      ]

      for (const [error, isError] of validators) {
        if (isError()) {
          return error
        }
      }
    }

    function getErrorMessage(error: ValidationError): string {
      const guessToUpperCase = currentGuess.toUpperCase()
      const translationKey = `errors.validation.${error}`

      switch (error) {
        case ValidationError.EMPTY_WORD:
          return t(translationKey)

        case ValidationError.ILLEGAL_WORD:
        case ValidationError.ALREADY_GUESSED:
          return t(translationKey, { word: guessToUpperCase })

        case ValidationError.TOO_SHORT:
          return t(translationKey, {
            word: guessToUpperCase,
            actualLength: currentGuess.length,
            requiredLength: WORD_LENGTH,
          })
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentGuess, gameState, guesses, t, words])

  function resetCurrentGuess(): void {
    setCurrentGuess('')
  }

  function clearValidationError(): void {
    setValidationError(undefined)
  }

  function restartGame(): void {
    setGuesses([])
    resetCurrentGuess()
    setSolution(getRandomWord(words))
  }

  function getStatusNotification(): INotification | undefined {
    const translationKey = `notification.status.${gameState}`

    switch (gameState) {
      case GameState.PLAYER_WON:
        return {
          type: 'success',
          text: t(translationKey),
        }
      case GameState.GAME_OVER:
        return {
          type: 'error',
          text: t(translationKey, { solution: solution.toUpperCase() }),
        }
      case GameState.IN_PROGRESS:
        return undefined
    }
  }

  return {
    solution,
    guesses,
    currentGuess,
    gameState,
    restartGame,
    notification: validationError ?? getStatusNotification(),
  }
}

function computeGameState(guesses: string[], solution: string): GameState {
  if (guesses.length === MAX_GUESSES) {
    return GameState.GAME_OVER
  }

  if (guesses.includes(solution)) {
    return GameState.PLAYER_WON
  }

  return GameState.IN_PROGRESS
}

async function fetchWords(locale: Locale): Promise<string[]> {
  const response = await fetch(`words_${locale}.json`)
  return (await response.json()) as string[]
}
