import { WORD_LENGTH } from '../contants'
import { range } from '../utils'

export function WordRow({
  word,
  renderCell,
}: {
  word?: string
  renderCell: (char: string, index: number) => JSX.Element
}): JSX.Element {
  const chars =
    word !== undefined ? [...word] : range(WORD_LENGTH).map(() => '')
  return (
    <div className='row'>
      {chars.map((char, i) => (
        <div key={i}>{renderCell(char, i)}</div>
      ))}
    </div>
  )
}
