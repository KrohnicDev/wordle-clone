import axios from 'axios'
import { createContext, PropsWithChildren, useContext } from 'react'
import { useQuery } from 'react-query'
import { valueOrThrow } from '../utils'
import { useSettings } from './useSettings'

interface WordData {
  words: string[]
  solutions: string[]
  isLoading: boolean
}

const WORD_CONTEXT = createContext<WordData | undefined>(undefined)

/** Provides access to global word list context */
export function useWordData() {
  return valueOrThrow(useContext(WORD_CONTEXT))
}

export function DataProvider({ children }: PropsWithChildren<unknown>) {
  const wordsQuery = useWordsQuery('words')
  const solutionsQuery = useWordsQuery('solutions')
  const words = wordsQuery.data ?? []
  const solutions = solutionsQuery.data ?? words
  const context = {
    words,
    solutions,
    isLoading: wordsQuery.isLoading || solutionsQuery.isLoading,
  }
  return (
    <WORD_CONTEXT.Provider value={context}>{children}</WORD_CONTEXT.Provider>
  )
}

function useWordsQuery(prefix: 'words' | 'solutions') {
  const { locale } = useSettings()
  return useQuery({
    queryKey: `${prefix}-${locale}`,
    queryFn: () => fetchWordList(`${prefix}_${locale.value}.json`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  })
}

async function fetchWordList(fileName: string) {
  const res = await axios.get<string[]>(fileName)
  return res.data
}
