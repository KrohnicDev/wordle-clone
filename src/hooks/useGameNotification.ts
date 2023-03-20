import { useTranslation } from 'react-i18next'
import { WORD_LENGTH } from '../constants'
import {
  GameState,
  INotification,
  ValidationError,
  ValidationErrorDto,
} from '../types'
import { useWordleGame } from './useWordleGame'

export function useGameNotification(): INotification | undefined {
  const { t } = useTranslation()
  const { gameState, solution, error } = useWordleGame()

  function getStatusNotification(): INotification | undefined {
    const translationKey = `notifications.status.${gameState}`

    switch (gameState) {
      case GameState.WIN:
        return {
          type: 'success',
          text: t(translationKey),
        }
      case GameState.LOSE:
        return {
          type: 'error',
          text: t(translationKey, { solution: solution.toUpperCase() }),
        }
      case GameState.IN_PROGRESS:
        return undefined
    }
  }

  function composeErrorMessage({ type, guess }: ValidationErrorDto): string {
    const translationKey = `errors.validation.${type}`

    switch (type) {
      case ValidationError.EMPTY_WORD: {
        return t(translationKey)
      }

      case ValidationError.ILLEGAL_WORD:
      case ValidationError.ALREADY_GUESSED: {
        return t(translationKey, { word: guess.toUpperCase() })
      }

      case ValidationError.TOO_SHORT: {
        return t(translationKey, {
          word: guess.toUpperCase(),
          actualLength: guess.length,
          requiredLength: WORD_LENGTH,
        })
      }
    }
  }

  return error
    ? { type: 'warning', text: composeErrorMessage(error) }
    : getStatusNotification()
}
