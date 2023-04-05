import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  return useStorage(key, initialValue, localStorage)
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  return useStorage(key, initialValue, sessionStorage)
}

function useStorage<T>(key: string, initialValue: T, storage: Storage) {
  const persistedValue = storage.getItem(key)

  const [value, setValue] = useState(() =>
    persistedValue ? (JSON.parse(persistedValue) as T) : initialValue
  )

  useEffect(
    () => storage.setItem(key, JSON.stringify(value)),
    [key, storage, value]
  )

  return [value, setValue] as const
}
