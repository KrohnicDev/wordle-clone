import { WORD_LENGTH } from '../../constants'
import { useGameState } from '../../hooks/useGameState'
import { useSettings } from '../../hooks/useSettings'
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
  const { char } = props
  const { availableChars } = useGameState()
  const { checkIncorrectChars } = useSettings()
  const isForbidden =
    checkIncorrectChars.isEnabled &&
    char.trim() !== '' &&
    !availableChars.includes(char)

  return (
    <Cell
      guessType={'current-guess'}
      status={isForbidden ? 'forbidden' : undefined}
      {...props}
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
