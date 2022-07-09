import axios from 'axios'
import { useQuery } from 'react-query'
import { useLocale } from './useLocale'

export function useWords() {
  const { locale } = useLocale()
  const queryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  } as const

  const fetchWords = createFetcher('words')
  const { data: words = [] } = useQuery(
    `words-${locale}`,
    fetchWords,
    queryOptions
  )

  const fetchSolutions = createFetcher('solutions')
  const { data: solutions = words } = useQuery(
    `solutions-${locale}`,
    fetchSolutions,
    queryOptions
  )

  function createFetcher(prefix: 'words' | 'solutions') {
    return () => {
      const fileName = `${prefix}_${locale}.json`
      return axios
        .get<string[]>(fileName)
        .then((res) => res.data)
        .catch(() => undefined)
    }
  }

  return {
    words,
    solutions,
  }
}
