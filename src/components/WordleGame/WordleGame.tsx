import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useNotification } from '../../hooks/useNotification'
import { useGameState } from '../../hooks/useWordleGame'
import Notification from '../NotificationElement'
import WordleGrid from '../WordleGrid'
import './WordleGame.css'

export function WordleGame() {
  return (
    <Stack>
      <WordleGrid />
      <Notification notification={useNotification()} />
      <RestartGameButton />
    </Stack>
  )
}

function RestartGameButton() {
  const { t } = useTranslation()
  const { restartGame, guesses, currentGuess } = useGameState()
  return (
    <Button
      variant='contained'
      onClick={restartGame}
      disabled={guesses.length === 0 && currentGuess.length === 0}
    >
      {t('buttons.restartGame')}
    </Button>
  )
}
