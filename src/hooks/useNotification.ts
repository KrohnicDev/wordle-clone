import { useTranslation } from 'react-i18next'
import { WORD_LENGTH } from '../constants'
import { INotification, ValidationErrorDto } from '../types'
import { useGameState } from './useGameState'

export function useNotification(): INotification | undefined {
  const { t } = useTranslation()
  const { phase, solution, error } = useGameState()

  function getStatusNotification(): INotification | undefined {
    const translationKey = `notifications.status.${phase}`

    switch (phase) {
      case 'win':
        return {
          type: 'success',
          text: t(translationKey),
        }
      case 'lose':
        return {
          type: 'error',
          text: t(translationKey, { solution: solution.toUpperCase() }),
        }
      case 'in-progress':
        return undefined
    }
  }

  function composeErrorMessage({
    type,
    guess,
    char,
  }: ValidationErrorDto): string {
    const translationKey = `errors.validation.${type}`

    switch (type) {
      case 'empty-word': {
        return t(translationKey)
      }

      case 'illegal-char': {
        return t(translationKey, { char: char?.toUpperCase() })
      }

      case 'illegal-word':
      case 'used-word': {
        return t(translationKey, { word: guess?.toUpperCase() })
      }

      case 'short-word': {
        return t(translationKey, {
          word: guess?.toUpperCase(),
          actualLength: guess?.length,
          requiredLength: WORD_LENGTH,
        })
      }
    }
  }

  return error
    ? { type: 'warning', text: composeErrorMessage(error) }
    : getStatusNotification()
}
