import { WORD_LENGTH } from '../constants'

export function range(size: number): number[] {
  return Array.from(Array(size).keys())
}

export function withoutLastChar(guess: string): string {
  return guess.slice(0, guess.length - 1)
}

export function getRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}

export function isValidChar(currentGuess: string, key: string): boolean {
  return (
    key.length === 1 &&
    key.match(/[a-zäöA-ZÄÖ]/g) !== null &&
    currentGuess.length < WORD_LENGTH
  )
}

export function valueOrThrow<T>(value: T) {
  if (value == null) {
    throw new Error('value must not be nullish')
  }
  return value as NonNullable<T>
}
