import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const persistedValue = localStorage.getItem(key)

  const [value, setValue] = useState(() =>
    persistedValue ? (JSON.parse(persistedValue) as T) : initialValue
  )

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value]
  )

  return [value, setValue] as const
}
