import axios from 'axios'
import { createContext, PropsWithChildren, useContext } from 'react'
import { useQuery } from 'react-query'
import { valueOrThrow } from '../utils'
import { useLocale } from './useLocale'

interface WordData {
  words: string[]
  solutions: string[]
}

const WORD_CONTEXT = createContext<WordData | undefined>(undefined)

/** Provides access to global word list context */
export function useWordData() {
  return valueOrThrow(useContext(WORD_CONTEXT))
}

export function DataProvider({ children }: PropsWithChildren<unknown>) {
  const words = useWordsQuery('words') ?? []
  const solutions = useWordsQuery('solutions') ?? words
  return (
    <WORD_CONTEXT.Provider value={{ words, solutions }}>
      {children}
    </WORD_CONTEXT.Provider>
  )
}

function useWordsQuery(prefix: 'words' | 'solutions') {
  const { locale } = useLocale()

  const query = useQuery({
    queryKey: `${prefix}-${locale}`,
    queryFn: () => fetchWordList(`${prefix}_${locale}.json`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  return query.data
}

async function fetchWordList(fileName: string) {
  const res = await axios.get<string[]>(fileName)
  return res.data
}
