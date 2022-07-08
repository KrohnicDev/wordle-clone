import { WORD_LENGTH } from '../contants'

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
