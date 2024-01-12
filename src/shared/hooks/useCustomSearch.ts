import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { showNotification } from '@shared/utils'
import { IUser } from '@shared/types/IUser'
import { getUsersSearch } from '@/firebase/users'


export const useCustomSearch = (
  myUserId: string,
  value: string,
  setIsLoading: (isLoading: boolean) => void
) => {
  const delayedValue = useDebounce(value, 1000)
  const [foundUsers, setFoundUsers] = useState<IUser[]>([])
  const [allUsers, setAllUsers] = useState<IUser[]>([])

  useEffect(() => {
    setIsLoading(true)
    getUsersSearch(myUserId)
      .then((users) => setAllUsers(users))
      .catch((error) => showNotification('error', error.message))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const filteredUsers = allUsers.filter((user) =>
      user.userName.includes(value)
    )
    setFoundUsers(filteredUsers)
  }, [delayedValue, allUsers])
  return foundUsers
}
