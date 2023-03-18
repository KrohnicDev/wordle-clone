import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useWordleGame } from '../../hooks/useWordleGame'
import Notification from '../NotificationElement'
import WordleGrid from '../WordleGrid'
import './WordleGame.css'

export function WordleGame() {
  const { t } = useTranslation()
  const { currentGuess, guesses, notification, restartGame } = useWordleGame()
  return (
    <Stack>
      <WordleGrid />
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
