import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { MAX_GUESSES, WORD_LENGTH } from '../contants'
import { GameState, GuessError, INotification, Locale } from '../types'
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
  const { data: words = [] } = useQuery(`words-${locale}`, () =>
    fetchWords(locale)
  )
  const gameState = computeGameState(guesses, solution)

  // Update solution after words have been fetched
  useEffect(() => {
    if (words.length > 0) {
      setSolution(getRandomWord(words))
    }
  }, [words])

  // Update current guess based on keyboard events
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

      if (error !== undefined) {
        setCurrentGuess('')
        setValidationError({
          text: populateError(error, currentGuess),
          type: 'warning',
        })
        setTimeout(clearValidationError, 5000)
        return
      }

      clearValidationError()
      submitCurrentGuess()
    }

    function validateCurrentGuess(): GuessError | void {
      if (currentGuess.length !== WORD_LENGTH) {
        return GuessError.TOO_SHORT
      }

      if (guesses.includes(currentGuess)) {
        return GuessError.ALREADY_GUESSED
      }

      if (!words.includes(currentGuess)) {
        return GuessError.INVALID_WORD
      }
    }

    function submitCurrentGuess(): void {
      if (gameState === GameState.IN_PROGRESS) {
        setGuesses((arr) => [...arr, currentGuess])
        setCurrentGuess('')
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentGuess, gameState, guesses, words])

  function clearValidationError(): void {
    setValidationError(undefined)
  }

  function restartGame(): void {
    setGuesses([])
    setCurrentGuess('')
    setSolution(getRandomWord(words))
  }

  return {
    solution,
    guesses,
    currentGuess,
    gameState,
    restartGame,
    notification: validationError ?? getStatusNotification(gameState, solution),
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

function getStatusNotification(
  state: GameState,
  solution: string
): INotification | undefined {
  switch (state) {
    case GameState.PLAYER_WON:
      return {
        type: 'success',
        text: 'You win!',
      }
    case GameState.GAME_OVER:
      return {
        type: 'error',
        text: `You lose! Solution was ${solution.toUpperCase()}`,
      }
    case GameState.IN_PROGRESS:
      return undefined
  }
}

function populateError(error: GuessError, guess: string): string {
  const guessToUpperCase = guess.toUpperCase()
  switch (error) {
    case GuessError.INVALID_WORD:
    case GuessError.ALREADY_GUESSED:
      return error.replaceAll(v(1), guessToUpperCase)
    case GuessError.TOO_SHORT:
      return error
        .replaceAll(v(1), guessToUpperCase)
        .replaceAll(v(2), String(guess.length))
        .replaceAll(v(3), String(WORD_LENGTH))
  }

  function v(n: number) {
    return `{${n}}`
  }
}
