import { useState } from 'react'
import { useQuery } from 'react-query'
import './App.css'

const WORD_LENGTH = 5
const MAX_GUESSES = 6

export default function App(): JSX.Element {
  const [guesses, setGuesses] = useState<string[]>(
    Array.from(Array(MAX_GUESSES))
  )

  useQuery('words', fetchWords, { initialData: [] }).data ?? []

  return (
    <div className='game'>
      <h1>Wordle Clone</h1>
      {guesses.map((word) => (
        <WordRow key={word} word={word} />
      ))}
    </div>
  )
}

interface WordRowProps {
  word: string | undefined
}

function WordRow({ word }: WordRowProps): JSX.Element {
  const iterable = word !== undefined ? [...word] : range(WORD_LENGTH)
  return (
    <div className='row'>
      {iterable.map((m) => (
        <CharacterCell key={m} char={typeof m === 'string' ? m : undefined} />
      ))}
    </div>
  )
}

interface CharacterProps {
  char: string | undefined
}

function CharacterCell({ char }: CharacterProps): JSX.Element {
  return <div className='cell'>{char}</div>
}

async function fetchWords(): Promise<string[]> {
  await sleep(500)
  const response = await fetch('all_words.json')
  return (await response.json()) as string[]
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(() => resolve(''), ms))
}

function range(size: number): number[] {
  return Array.from(Array(size).keys())
}
