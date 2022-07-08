import { useWordle } from '../hooks/useWordle'
import { GameState, Locale } from '../types'
import NotificationElement from './NotificationElement'
import WordleGrid from './WordleGrid'

export function WordleGame({ locale }: { locale: Locale }) {
  const {
    currentGuess,
    gameState,
    guesses,
    notification,
    solution,
    restartGame,
  } = useWordle(locale)

  return (
    <div className='game'>
      <WordleGrid
        currentGuess={currentGuess}
        gameState={gameState}
        solution={solution}
        guesses={guesses}
      />

      <NotificationElement notification={notification} />

      <button
        onClick={restartGame}
        hidden={gameState === GameState.IN_PROGRESS}
      >
        Restart game
      </button>
    </div>
  )
}
