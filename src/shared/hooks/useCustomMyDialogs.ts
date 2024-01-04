import { useEffect, useState } from 'react'
import { useAppSelector } from '.'
import { getDatabase, onValue, ref } from 'firebase/database'

import { updateListMyDialogs } from '@/firebase/users/updateListMyDialogs'
import { IUser } from '@shared/types/IUser'

const dbRealTime = getDatabase()

export const useCustomMyDialogs = (
  isMyDialogs: boolean,
  setIsLoading: (isLoading: boolean) => void
) => {
  const { userId: myUserId } = useAppSelector(
    (state) => state.ProfileReducer.user
  )

  const [dialogUserList, setDialogUserList] = useState<IUser[]>([])
  useEffect(() => {
    let unSubscribe
    if (isMyDialogs) {
      const myDialogsRef = ref(
        dbRealTime,
        'dialogsUsers/' + myUserId + '/dialogs'
      )
      setIsLoading(true)
      unSubscribe = onValue(myDialogsRef, async (snapshot) => {
        const data = await snapshot.val()
        if (data) {
          const users: IUser[] = await updateListMyDialogs(Object.keys(data))
          users.forEach((user: IUser) => {
            user.lastMessage = data[user.userId].lastMessage
          })
          users.sort((a, b) => b.lastMessage!.date - a.lastMessage!.date)
          setDialogUserList(users)
          setIsLoading(false)
        }
      })
    } else {
      setDialogUserList([])
    }
    return unSubscribe
  }, [isMyDialogs])

  return dialogUserList
}
