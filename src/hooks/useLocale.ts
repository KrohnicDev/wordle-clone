import { useSettings } from './useSettings'

export function useCurrentLocale() {
  const { locale } = useSettings()
  return locale.value
}
