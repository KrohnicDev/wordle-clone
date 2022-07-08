import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import './App.css'

const WORD_LENGTH = 5
const MAX_GUESSES = 6

export default function App(): JSX.Element {
  const { guesses, currentGuess, solution, gameState } = useWordle()
  const emptyRowCount = MAX_GUESSES - guesses.length - 1

  return (
    <div className='game'>
      <h1>Wordle Clone</h1>

      {guesses.map((word) => (
        <WordRow
          key={word}
          word={word}
          renderCell={(char, i): JSX.Element => {
            const isCorrectLocationAndLetter = solution[i] === char
            const isCorrectLetter = solution.includes(char)
            const status = isCorrectLocationAndLetter
              ? 'correct'
              : isCorrectLetter
              ? 'partially-correct'
              : 'incorrect'

            return (
              <CharacterCell
                char={char}
                guessType='submitted'
                status={status}
              />
            )
          }}
        />
      ))}

      {gameState === GameState.IN_PROGRESS && (
        <CurrentGuessRow guess={currentGuess} />
      )}

      {emptyRowCount > 0 &&
        range(emptyRowCount).map((i) => (
          <WordRow
            key={i}
            renderCell={(): JSX.Element => <CharacterCell guessType='empty' />}
          />
        ))}
    </div>
  )
}

function CurrentGuessRow({ guess = '' }: { guess: string }): JSX.Element {
  const emptyCellCount = WORD_LENGTH - guess.length
  const word =
    guess +
    range(emptyCellCount)
      .map(() => ' ')
      .join('')
  return (
    <WordRow
      word={word}
      renderCell={(char): JSX.Element => (
        <CharacterCell guessType='current-guess' char={char} />
      )}
    />
  )
}

function WordRow({
  word,
  renderCell,
}: {
  word?: string
  renderCell: (char: string, index: number) => JSX.Element
}): JSX.Element {
  const chars =
    word !== undefined ? [...word] : range(WORD_LENGTH).map(() => '')
  return (
    <div className='row'>
      {chars.map((char, i) => (
        <div key={i}>{renderCell(char, i)}</div>
      ))}
    </div>
  )
}

function CharacterCell({
  char,
  guessType,
  status,
}: {
  char?: string
  guessType: 'current-guess' | 'submitted' | 'empty'
  status?: 'correct' | 'partially-correct' | 'incorrect'
}): JSX.Element {
  const statusClass = status === undefined ? '' : status
  return <div className={`cell ${guessType} ${statusClass}`}>{char}</div>
}

async function fetchWords(): Promise<string[]> {
  const response = await fetch('all_words.json')
  return (await response.json()) as string[]
}

function range(size: number): number[] {
  return Array.from(Array(size).keys())
}

interface UseWordle {
  solution: string
  currentGuess: string
  guesses: string[]
  gameState: GameState
}

enum GameState {
  IN_PROGRESS = 'in progress',
  GAME_OVER = 'game over',
  PLAYER_WON = 'player won',
}

function useWordle(): UseWordle {
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<string[]>([])
  const words = useQuery('words', fetchWords, { initialData: [] }).data ?? []
  const solution = useMemo(() => {
    // return words[Math.floor(Math.random() * words.length)]
    return 'hello'
  }, [words])
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    function handleKeyPress(event: KeyboardEvent): void {
      const key = event.key

      if (
        currentGuess.length < WORD_LENGTH &&
        key.length === 1 &&
        key.match(/[a-zA-Z]/g)
      ) {
        setCurrentGuess((guess) => guess + key.toLowerCase())
      } else if (key === 'Enter') {
        const error = validateGuess()
        if (error !== undefined) {
          const message = populateError(error, currentGuess)
          return alert(message)
        }
        submitGuess()
      } else if (key === 'Backspace') {
        setCurrentGuess((guess) => guess.slice(0, guess.length - 1))
      }
    }

    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    if (guesses.length === MAX_GUESSES) {
      setGameState(GameState.GAME_OVER)
    }
  }, [guesses])

  useEffect(() => {
    if (gameState === GameState.IN_PROGRESS) {
      return
    }

    if (gameState === GameState.PLAYER_WON) {
      alert('You won!')
    } else if (gameState === GameState.GAME_OVER) {
      alert('You lost!')
    }

    // Restart game
    window.location.reload()
  }, [gameState])

  function validateGuess(): GuessError | void {
    if (currentGuess.length !== WORD_LENGTH) {
      return GuessError.INVALID_LENGTH
    }

    if (guesses.includes(currentGuess)) {
      return GuessError.ALREADY_GUESSED
    }

    if (!words.includes(currentGuess)) {
      return GuessError.INVALID_WORD
    }
  }

  function submitGuess(): void {
    if (currentGuess === solution) {
      return setGameState(GameState.PLAYER_WON)
    }

    setGuesses((arr) => [...arr, currentGuess])
    setCurrentGuess('')
  }

  return {
    solution,
    guesses,
    currentGuess,
    gameState,
  }
}

enum GuessError {
  INVALID_WORD = `'{1}' is not a valid word`,
  INVALID_LENGTH = `Guess length should be {1} (was: {2})`,
  ALREADY_GUESSED = `Word '{1}' has already been guessed`,
}

function populateError(error: GuessError, guess: string): string {
  const var1 = '{1}'
  const var2 = '{2}'
  switch (error) {
    case GuessError.INVALID_WORD:
    case GuessError.ALREADY_GUESSED:
      return error.replaceAll(var1, guess)

    case GuessError.INVALID_LENGTH:
      return error
        .replaceAll(var1, String(WORD_LENGTH))
        .replaceAll(var2, String(guess.length))
  }
}
