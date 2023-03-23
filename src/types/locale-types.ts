export const LOCALES = ['fi', 'en', 'se'] as const

export type Locale = (typeof LOCALES)[number]

export function isLocale(arg: unknown): arg is Locale {
  return LOCALES.some((locale) => arg === locale)
}
