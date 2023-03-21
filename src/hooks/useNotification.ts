import { useTranslation } from 'react-i18next'
import { WORD_LENGTH } from '../constants'
import {
  GamePhase,
  INotification,
  ValidationError,
  ValidationErrorDto,
} from '../types'
import { useGameState } from './useWordleGame'

export function useNotification(): INotification | undefined {
  const { t } = useTranslation()
  const { phase, solution, error } = useGameState()

  function getStatusNotification(): INotification | undefined {
    const translationKey = `notifications.status.${phase}`

    switch (phase) {
      case GamePhase.WIN:
        return {
          type: 'success',
          text: t(translationKey),
        }
      case GamePhase.LOSE:
        return {
          type: 'error',
          text: t(translationKey, { solution: solution.toUpperCase() }),
        }
      case GamePhase.IN_PROGRESS:
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
