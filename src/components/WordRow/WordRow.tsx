import { WORD_LENGTH } from '../../constants'
import { range } from '../../utils'
import './WordRow.css'

interface Props {
  word?: string
  renderCell: (char: string, index: number) => JSX.Element
}

export function WordRow({ word, renderCell }: Props): JSX.Element {
  const chars = word ? [...word] : range(WORD_LENGTH).map(() => '')
  return (
    <div className='row'>
      {chars.map((char, i) => (
        <div key={i}>{renderCell(char, i)}</div>
      ))}
    </div>
  )
}
