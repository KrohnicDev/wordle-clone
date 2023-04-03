import { WORD_LENGTH } from '../../constants'
import { useGameState } from '../../hooks/useGameState'
import { range } from '../../utils'
import Cell from '../CharacterCell'
import Row from '../WordRow'

export function CurrentGuessRow() {
  const { currentGuess, phase } = useGameState()
  return phase === 'in-progress' ? (
    <Row
      word={withEmptyCells(currentGuess)}
      renderCell={(char, i) => (
        <CurrentRowCell char={char} isCurrentCell={currentGuess.length === i} />
      )}
    />
  ) : null
}

type CurrentRowCellProps = {
  char: string
  isCurrentCell: boolean
}

function CurrentRowCell(props: CurrentRowCellProps) {
  const { char, isCurrentCell } = props
  const { availableChars } = useGameState()
  const isForbidden = char.trim() !== '' && !availableChars.includes(char)

  return (
    <Cell
      guessType={'current-guess'}
      char={char}
      isCurrentCell={isCurrentCell}
      status={isForbidden ? 'forbidden' : undefined}
    />
  )
}

function withEmptyCells(guess: string): string {
  const emptyCellCount = WORD_LENGTH - guess.length
  const emptyChars = range(emptyCellCount)
    .map(() => ' ')
    .join('')
  return guess + emptyChars
}
