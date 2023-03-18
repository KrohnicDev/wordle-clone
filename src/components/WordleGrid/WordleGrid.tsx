import { MAX_GUESSES, WORD_LENGTH } from '../../constants'
import { useWordleGame } from '../../hooks/useWordleGame'
import { GameState } from '../../types'
import { range } from '../../utils'
import Cell from '../CharacterCell'
import Row from '../WordRow'
import { PreviousGuessRow } from './PreviousGuessRow'

export function WordleGrid() {
  const { currentGuess, gameState, guesses } = useWordleGame()
  return (
    <div className='grid'>
      {guesses.map((word) => (
        <PreviousGuessRow key={word} word={word} />
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

      {makeEmptyRows(MAX_GUESSES - guesses.length - 1)}
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

function makeEmptyRows(count: number): JSX.Element[] {
  return range(count).map((i) => (
    <Row key={i} renderCell={() => <Cell guessType='empty' />} />
  ))
}
