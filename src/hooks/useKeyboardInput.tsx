import { useEffect, useRef } from 'react'
import { isValidChar } from '../utils'

type KeyboardActions = {
  onSubmit: () => void
  onBackspace: () => void
  onCharInput: (char: string) => void
}

/** Handles keyboard press logic */
export function useKeyboardInput(actions: KeyboardActions) {
  const onSubmit = useRef(actions.onSubmit)
  const onBackspace = useRef(actions.onBackspace)
  const onCharInput = useRef(actions.onCharInput)

  onSubmit.current = actions.onSubmit
  onBackspace.current = actions.onBackspace
  onCharInput.current = actions.onCharInput

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      const key = event.key

      if (key === 'Enter') {
        onSubmit.current()
      } else if (key === 'Backspace') {
        onBackspace.current()
      } else if (isValidChar(key)) {
        onCharInput.current(key)
      } else {
        console.debug('Invalid character: ', key)
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
}
