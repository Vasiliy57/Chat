import { useEffect, useState } from 'react'
import { useAppSelector } from '@shared/hooks'

import { User } from '../user/User'
import { Button } from '@shared/ui'

import { DialogsProps, IUser } from './types'
import { updateListMyDialogs } from '@/firebase/users/updateListMyDialogs'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'

import { BUTTON_CLASS_NAME, BUTTON_TYPE } from '@shared/constants'

import classes from './dialogs.module.css'

export const Dialogs: React.FC<DialogsProps> = ({
  isMyDialogs,
  onSwitchDialogs,
  searchDialogUserList,
}) => {
  const { userId: myUserId, email: myEmail } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogUserList, setDialogUserList] = useState<IUser[]>([])

  const userList = isMyDialogs ? dialogUserList : searchDialogUserList

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
    }
    return unSubscribe
  }, [isMyDialogs])

  return (
    <div className={isMyDialogs ? classes.dialogs : ''}>
      <div className={classes.btnGroup}>
        <Button
          styleBtn={isMyDialogs ? { color: '#00A3FF' } : {}}
          onClick={() => onSwitchDialogs(true)}
          buttonType={BUTTON_TYPE.BUTTON}
          buttonClassName={BUTTON_CLASS_NAME.SWITCH}
          content="MY CHATS"
        />
        <Button
          styleBtn={!isMyDialogs ? { color: '#00A3FF' } : {}}
          onClick={() => onSwitchDialogs(false)}
          buttonType={BUTTON_TYPE.BUTTON}
          buttonClassName={BUTTON_CLASS_NAME.SWITCH}
          content="SEARCH CHATS"
        />
      </div>

      {isLoading ? (
        <span>123213333333333333321321321 213333333333333333</span>
      ) : (
        userList.map((user) => {
          return (
            <User
              lastMessage={user.lastMessage}
              myEmail={myEmail}
              key={user.userId}
              userName={user.userName}
              email={user.email}
              userId={user.userId}
              isSelected={user.email === currentDialogUser?.email}
              // myUserId={myUserId}
              avatar={user.avatar}
            />
          )
        })
      )}
    </div>
  )
}
