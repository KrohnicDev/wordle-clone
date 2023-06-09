export function range(size: number): number[] {
  return size > 0 ? Array.from(Array(size).keys()) : []
}

export function withoutLastChar(guess: string): string {
  return guess.slice(0, guess.length - 1)
}

export function selectRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}

export function isValidChar(str: string) {
  return str.length === 1 && str.match(/[a-zåäöA-ZÅÄÖ]/g) !== null
}

export function valueOrThrow<T>(value: T) {
  if (value == null) {
    throw new Error('value must not be nullish')
  }
  return value as NonNullable<T>
}

export function toCharArray(str: string) {
  return [...str]
}

export function match<T>(...matchers: [predicate: () => boolean, value: T][]) {
  for (const [predicate, value] of matchers) {
    if (predicate()) {
      return value
    }
  }

  return undefined
}
