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
    queryFn: fetchWords,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  async function fetchWords() {
    const fileName = `${prefix}_${locale}.json`
    const res = await axios.get<string[]>(fileName)
    return res.data
  }

  return query.data
}
