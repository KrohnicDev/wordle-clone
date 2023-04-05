import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { DataProvider } from '../../hooks/useWordData'
import { GameProvider, useGameEngine } from '../../hooks/useGameEngine'
import AvailableChars from '../AvailableChars'
import NotificationElement from '../NotificationElement'
import WordleGrid from '../WordleGrid'
import './WordleGame.css'
import { useSettings } from '../../hooks/useSettings'

export function WordleGame() {
  const { checkIncorrectChars } = useSettings()
  return (
    <Stack>
      <DataProvider>
        <GameProvider>
          {checkIncorrectChars.isEnabled && <AvailableChars />}
          <WordleGrid />
          <NotificationElement />
          <RestartGameButton />
        </GameProvider>
      </DataProvider>
    </Stack>
  )
}

function RestartGameButton() {
  const { t } = useTranslation()
  const { restartGame, guesses, currentGuess } = useGameEngine()
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
