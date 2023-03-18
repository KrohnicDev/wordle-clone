import { useWordleGame } from '../../hooks/useWordleGame'
import Cell from '../CharacterCell'
import Row from '../WordRow'

interface Props {
  word: string
}

export function PreviousGuessRow({ word }: Props): JSX.Element {
  const { solution } = useWordleGame()
  return (
    <Row
      key={word}
      word={word}
      renderCell={(char, i) => {
        const status =
          solution[i] === char
            ? 'correct'
            : solution.includes(char)
            ? 'partially-correct'
            : 'incorrect'
        return <Cell char={char} guessType='submitted' status={status} />
      }}
    />
  )
}
