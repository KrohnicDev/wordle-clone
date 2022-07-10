import './CharacterCell.css'

interface Props {
  guessType: 'current-guess' | 'submitted' | 'empty'
  char?: string
  status?: 'correct' | 'partially-correct' | 'incorrect'
  isCurrentCell?: boolean
}

export function CharacterCell(props: Props): JSX.Element {
  const { char, guessType, status, isCurrentCell } = props
  const id = isCurrentCell ? 'current-cell' : undefined
  const className = `cell ${guessType} ${status ?? ''}`
  const cursorElement = <span className='blink'>_</span>
  const charElement = <span>{char}</span>
  return (
    <div className={className} id={id}>
      {isCurrentCell ? cursorElement : charElement}
    </div>
  )
}
