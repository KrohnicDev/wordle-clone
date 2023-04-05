import { useEffect, useRef } from 'react'
import { isValidChar } from '../utils'

/** Handles keyboard press logic */
export function useKeyboardEvents(eventHandlers: {
  onSubmit: () => void
  onBackspace: () => void
  onCharInput: (char: string) => void
}) {
  const onSubmit = useRef(eventHandlers.onSubmit)
  const onBackspace = useRef(eventHandlers.onBackspace)
  const onCharInput = useRef(eventHandlers.onCharInput)

  onSubmit.current = eventHandlers.onSubmit
  onBackspace.current = eventHandlers.onBackspace
  onCharInput.current = eventHandlers.onCharInput

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
