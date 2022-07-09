import { MAX_GUESSES, WORD_LENGTH } from '../contants'
import { GameState } from '../types'
import { range } from '../utils'
import { CharacterCell } from './CharacterCell'
import { WordRow } from './WordRow'

interface Props {
  guesses: string[]
  solution: string
  currentGuess: string
  gameState: GameState
}

export default function WordleGrid(props: Props) {
  const { guesses, solution, currentGuess, gameState } = props
  const emptyRowCount = MAX_GUESSES - guesses.length - 1

  const previousGuessRows = guesses.map((word) => (
    <WordRow
      key={word}
      word={word}
      renderCell={(char, i) => {
        const status =
          solution[i] === char
            ? 'correct'
            : solution.includes(char)
            ? 'partially-correct'
            : 'incorrect'

        return (
          <CharacterCell char={char} guessType='submitted' status={status} />
        )
      }}
    />
  ))

  const currentGuessRow = (
    <WordRow
      word={withEmptyCells(currentGuess)}
      renderCell={(char, i) => (
        <CharacterCell
          guessType={'current-guess'}
          char={char}
          isCurrentCell={currentGuess.length === i}
        />
      )}
    />
  )

  return (
    <div className='grid'>
      {previousGuessRows}
      {gameState === GameState.IN_PROGRESS && currentGuessRow}
      {emptyRowCount > 0 && getEmptyRows(emptyRowCount)}
    </div>
  )
}

function withEmptyCells(guess: string): string {
  const emptyCellCount = WORD_LENGTH - guess.length
  const emptyChars = range(emptyCellCount)
    .map(() => ' ')
    .join('')
  return guess + emptyChars
}

function getEmptyRows(count: number): JSX.Element[] {
  return range(count).map((i) => (
    <WordRow key={i} renderCell={() => <CharacterCell guessType='empty' />} />
  ))
}
