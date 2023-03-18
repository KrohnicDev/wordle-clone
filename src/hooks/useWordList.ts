import axios from 'axios'
import { useQuery } from 'react-query'
import { useLocale } from './useLocale'

export function useWordList() {
  const words = useWordsQuery('words') ?? []
  const solutions = useWordsQuery('solutions') ?? words
  return {
    words,
    solutions,
  }
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
