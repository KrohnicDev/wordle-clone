export type BooleanSetting = {
  isEnabled: boolean
  toggle(): void
}

export type OpenSetting<T> = {
  value: T
  set(newValue: T): void
}
