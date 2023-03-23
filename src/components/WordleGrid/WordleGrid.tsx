import { MAX_GUESSES } from '../../constants'
import { useGameState } from '../../hooks/useGameState'
import { range } from '../../utils'
import Cell from '../CharacterCell'
import Row from '../WordRow'
import { CurrentGuessRow } from './CurrentGuessRow'
import { PreviousGuessRow } from './PreviousGuessRow'

export function WordleGrid() {
  const { guesses } = useGameState()
  const emptyRowCount = MAX_GUESSES - guesses.length - 1

  const previousGuessRows = guesses.map((word) => (
    <PreviousGuessRow key={word} word={word} />
  ))

  const emptyRows = range(emptyRowCount).map((i) => (
    <Row key={i} renderCell={() => <Cell guessType='empty' />} />
  ))

  return (
    <div className='grid'>
      {previousGuessRows}
      <CurrentGuessRow />
      {emptyRows}
    </div>
  )
}
