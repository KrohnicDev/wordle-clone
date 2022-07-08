export function CharacterCell({
  char,
  guessType,
  status,
}: {
  char?: string
  guessType: 'current-guess' | 'submitted' | 'empty'
  status?: 'correct' | 'partially-correct' | 'incorrect'
}): JSX.Element {
  const statusClass = status === undefined ? '' : status
  return <div className={`cell ${guessType} ${statusClass}`}>{char}</div>
}
