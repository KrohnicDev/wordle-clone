import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useGameNotification } from '../../hooks/useGameNotification'
import { useWordleGame } from '../../hooks/useWordleGame'
import Notification from '../NotificationElement'
import WordleGrid from '../WordleGrid'
import './WordleGame.css'

export function WordleGame() {
  return (
    <Stack>
      <WordleGrid />
      <Notification notification={useGameNotification()} />
      <RestartGameButton />
    </Stack>
  )
}

function RestartGameButton() {
  const { t } = useTranslation()
  const { restartGame, guesses, currentGuess } = useWordleGame()
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
