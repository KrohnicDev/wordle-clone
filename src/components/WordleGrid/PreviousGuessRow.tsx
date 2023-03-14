import Cell from '../CharacterCell'
import Row from '../WordRow'

interface Props {
  word: string
  solution: string
}

export function PreviousGuessRow({ word, solution }: Props): JSX.Element {
  function getCellStatus(index: number, char: string) {
    return solution[index] === char
      ? 'correct'
      : solution.includes(char)
      ? 'partially-correct'
      : 'incorrect'
  }

  return (
    <Row
      key={word}
      word={word}
      renderCell={(char, i) => {
        const status = getCellStatus(i, char)
        return <Cell char={char} guessType='submitted' status={status} />
      }}
    />
  )
}
