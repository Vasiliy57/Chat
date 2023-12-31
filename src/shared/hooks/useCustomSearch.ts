import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { getUsersSearch } from '@/firebase/users'
import { showNotification } from '@shared/utils'
import { child, get, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'

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
    const dbRef = ref(dbRealTime)
    get(child(dbRef, 'dialogsUsers/' + myUserId + '/dialogs'))
      .then((snapshot) => {
        const data = Object.keys(snapshot.val())
        return data
      })
      .then((data) => {
        getUsersSearch(data, myUserId)
          .then((users) => setAllUsers(users))
          .catch((error) => showNotification('error', error.message))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    const filteredUsers = allUsers.filter((user) =>
      user.userName.includes(value)
    )
    setFoundUsers(filteredUsers)
  }, [delayedValue, allUsers])
  return foundUsers
}
