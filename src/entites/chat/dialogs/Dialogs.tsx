import { useEffect, useState } from 'react'
import { User } from '../user/User'
import classes from './dialogs.module.css'
import { DialogsProps, IUser } from './types'
import { updateListMyDialogs } from '@/firebase/users/updateListMyDialogs'
import { getAllUsersFireStore } from '@/firebase/users'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import { useAppSelector } from '@shared/hooks'
import { Button } from '@shared/ui'
import { BUTTON_CLASS_NAME, BUTTON_TYPE } from '@shared/constants'

export const Dialogs: React.FC<DialogsProps> = ({
  isMyDialogs,
  onSwitchDialogs, 
}) => {
  const myUserId = useAppSelector((state) => state.ProfileReducer.user.userId)
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )

  const [dialogUserList, setDialogUserList] = useState<IUser[]>([])
  const [searchDialogUserList, setSearchDialogUserList] = useState<IUser[]>([])
  const userList = isMyDialogs ? dialogUserList : searchDialogUserList

  useEffect(() => {
    const myDialogsRef = ref(
      dbRealTime,
      'dialogsUsers/' + myUserId + '/dialogs'
    )
    onValue(myDialogsRef, async (snapshot) => {
      const data = await snapshot.val()
      if (data) {
        const users = await updateListMyDialogs(Object.keys(data))
        setDialogUserList(users)
      }
    })
  }, [])

  useEffect(() => {
    if (!isMyDialogs) {
      getAllUsersFireStore(myUserId).then((users) =>
        setSearchDialogUserList(users)
      )
    }
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
      {userList.map((user, index) => {
        return (
          <User
            key={index}
            userName={user.userName}
            email={user.email}
            userId={user.userId}
            isSelected={user.email === currentDialogUser?.email}
            myUserId={myUserId}
            avatar={user.avatar}
          />
        )
      })}
    </div>
  )
}
