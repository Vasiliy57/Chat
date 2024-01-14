import { v4 } from 'uuid'

export const uniqueId = (): string => {
  return v4()
}
