import { MAX_GUESSES, WORD_LENGTH } from '../../constants'
import { GameState } from '../../types'
import { range } from '../../utils'
import Cell from '../CharacterCell'
import Row from '../WordRow'
import { PreviousGuessRow } from './PreviousGuessRow'

interface Props {
  guesses: string[]
  solution: string
  currentGuess: string
  gameState: GameState
}

export function WordleGrid({
  guesses,
  solution,
  currentGuess,
  gameState,
}: Props) {
  return (
    <div className='grid'>
      {guesses.map((word) => (
        <PreviousGuessRow key={word} word={word} solution={solution} />
      ))}

      {gameState === GameState.IN_PROGRESS && (
        <Row
          word={withEmptyCells(currentGuess)}
          renderCell={(char, i) => (
            <Cell
              guessType={'current-guess'}
              char={char}
              isCurrentCell={currentGuess.length === i}
            />
          )}
        />
      )}

      {emptyRows(MAX_GUESSES - guesses.length - 1)}
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

function emptyRows(count: number): JSX.Element[] {
  return range(count).map((i) => (
    <Row key={i} renderCell={() => <Cell guessType='empty' />} />
  ))
}
