import { useGameState } from '../../hooks/useGameState'
import { match } from '../../utils'
import Cell from '../CharacterCell'
import Row from '../WordRow'

interface Props {
  word: string
}

export function PreviousGuessRow({ word }: Props) {
  const { solution } = useGameState()
  return (
    <Row
      key={word}
      word={word}
      renderCell={(char, i) => (
        <Cell
          char={char}
          guessType='submitted'
          status={match(
            [() => solution[i] === char, 'correct'],
            [() => solution.includes(char), 'partially-correct'],
            [() => true, 'incorrect']
          )}
        />
      )}
    />
  )
}
