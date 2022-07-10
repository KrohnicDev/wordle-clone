import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useWordle } from '../../hooks/useWordle'
import Notification from '../NotificationElement'
import Grid from '../WordleGrid'
import './WordleGame.css'

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
    <Stack>
      <Grid
        currentGuess={currentGuess}
        gameState={gameState}
        solution={solution}
        guesses={guesses}
      />

      <Notification notification={notification} />

      <Button
        variant='contained'
        onClick={restartGame}
        disabled={guesses.length === 0 && currentGuess.length === 0}
      >
        {t('buttons.restartGame')}
      </Button>
    </Stack>
  )
}