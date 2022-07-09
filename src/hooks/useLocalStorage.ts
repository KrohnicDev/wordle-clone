import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const persistedValue = localStorage.getItem(key)
  const [value, setValue] = useState(() => {
    if (persistedValue == null) return initialValue
    const parsed = JSON.parse(persistedValue)
    return parsed as T
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
