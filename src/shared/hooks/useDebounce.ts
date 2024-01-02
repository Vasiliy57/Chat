import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value])

  return result
}
