import './CharacterCell.css'

interface Props {
  guessType: 'current-guess' | 'submitted' | 'empty'
  char?: string
  status?: 'correct' | 'partially-correct' | 'incorrect' | 'forbidden'
  isCurrentCell?: boolean
}

export function CharacterCell(props: Props): JSX.Element {
  const { char, guessType, status, isCurrentCell } = props
  const cursorElement = <span className='blink'>_</span>
  const charElement = <span>{char}</span>

  return (
    <div
      className={`cell ${guessType} ${status ?? ''}`}
      id={isCurrentCell ? 'current-cell' : undefined}
    >
      {isCurrentCell ? cursorElement : charElement}
    </div>
  )
}
