import { useEffect, useRef } from 'react'
import { isValidChar } from '../utils'

/** Handles keyboard press logic */
export function useKeyboardEvents(handlers: {
  onSubmit: () => void
  onBackspace: () => void
  onCharInput: (char: string) => void
}) {
  const onSubmit = useRef(handlers.onSubmit)
  const onBackspace = useRef(handlers.onBackspace)
  const onCharInput = useRef(handlers.onCharInput)

  onSubmit.current = handlers.onSubmit
  onBackspace.current = handlers.onBackspace
  onCharInput.current = handlers.onCharInput

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
