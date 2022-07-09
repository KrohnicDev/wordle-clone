import { useTranslation } from 'react-i18next'
import { useWordle } from '../hooks/useWordle'
import { GameState } from '../types'
import NotificationElement from './NotificationElement'
import WordleGrid from './WordleGrid'

export function WordleGame() {
  const { t } = useTranslation()
  const {
    currentGuess,
    gameState,
    guesses,
    notification,
    solution,
    restartGame,
  } = useWordle()

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
        {t('buttons.restartGame')}
      </button>
    </div>
  )
}
