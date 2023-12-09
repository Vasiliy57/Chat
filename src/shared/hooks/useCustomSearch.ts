import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { getAllUsers } from '@/firebase/users'
import { showNotification } from '@shared/utils'

interface IUser {
  email: string
  emailVerified: boolean
  userName: string
  uid: string
  img: string | null
  userId: string
  avatar: string | null
}

export const useCustomSearch = (myUserId: string, value: string) => {
  const delayedValue = useDebounce(value, 1000)
  const [foundUsers, setFoundUsers] = useState<IUser[]>([])
  const [allUsers, setAllUsers] = useState<IUser[]>([])

  useEffect(() => {
    getAllUsers(myUserId)
      .then((users) => setAllUsers(users))
      .catch((error) => showNotification('error', error.message))
  }, [])

  useEffect(() => {
    const filteredUsers = allUsers.filter((user) =>
      user.userName.includes(value)
    )
    setFoundUsers(filteredUsers)
  }, [delayedValue, allUsers])
  return foundUsers
}
