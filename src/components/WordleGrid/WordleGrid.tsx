import { MAX_GUESSES, WORD_LENGTH } from '../../constants'
import { useAvailableChars } from '../../hooks/useAvailableChars'
import { useGameState } from '../../hooks/useGameState'
import { range } from '../../utils'
import Cell from '../CharacterCell'
import Row from '../WordRow'
import { PreviousGuessRow } from './PreviousGuessRow'

export function WordleGrid() {
  const { currentGuess, phase, guesses } = useGameState()
  const availableChars = useAvailableChars()
  return (
    <div className='grid'>
      {guesses.map((word) => (
        <PreviousGuessRow key={word} word={word} />
      ))}

      {phase === 'in-progress' && (
        <Row
          word={withEmptyCells(currentGuess)}
          renderCell={(char, i) => {
            const isForbidden =
              char.trim() !== '' && !availableChars.includes(char)
            return (
              <Cell
                guessType={'current-guess'}
                char={char}
                isCurrentCell={currentGuess.length === i}
                status={isForbidden ? 'forbidden' : undefined}
              />
            )
          }}
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
