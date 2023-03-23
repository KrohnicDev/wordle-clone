import { useEffect } from 'react'
import { WORD_LENGTH } from '../../constants'
import { useAvailableChars } from '../../hooks/useAvailableChars'
import { useGameEngine } from '../../hooks/useGameEngine'
import { useGameState } from '../../hooks/useGameState'
import { ValidationError } from '../../types'
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
  const { addValidationError } = useGameEngine()
  const availableChars = useAvailableChars()
  const isForbidden = char.trim() !== '' && !availableChars.includes(char)

  useEffect(() => {
    if (isForbidden) {
      addValidationError({
        type: ValidationError.INVALID_CHARACTER,
        char,
      })
    }
  }, [addValidationError, char, isForbidden])

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
