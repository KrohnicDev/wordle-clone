export function CharacterCell({
  char,
  guessType,
  status,
  isCurrentCell,
}: {
  guessType: 'current-guess' | 'submitted' | 'empty'
  char?: string
  status?: 'correct' | 'partially-correct' | 'incorrect'
  isCurrentCell?: boolean
}): JSX.Element {
  return (
    <div
      className={`cell ${guessType} ${status ?? ''}`}
      id={isCurrentCell ? 'current-cell' : undefined}
    >
      {isCurrentCell ? <span className='blink'>_</span> : <span>{char}</span>}
    </div>
  )
}
