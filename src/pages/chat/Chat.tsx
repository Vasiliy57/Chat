
import { Logo } from '@shared/components'
import classes from './main.module.css'
import { Dialogs, Header, Messages, Search } from '@/entites/chat'
import { CreateMessage } from '@features/index'
import { useAppSelector } from '@shared/hooks'
import { useEffect, useState } from 'react'
import { TypeOnSelectDialog } from './types'
import { addDialog, createDialogs, getAllUsersFireStore, getUser } from '@/firebase/users'
import { Dialog, MenuDialogs } from '@widgets/chat'
import { IUser } from '@/entites/chat/dialogs/types'

export const Chat: React.FC = () => {
  const { email: myEmail, userId: myUserId } = useAppSelector(state => state.ProfileReducer.user)
  const [currentMessages, setCurrentMessages] = useState<null | string[]>([])
  const [dialogId, setdialogId] = useState<null | string>(null)

  const [dialogUserList, setDialogUserList] = useState([])
  const [currentDialogUser, setCurrentDialogUser] = useState<IUser | null>(null)

  const [myDialogs, setMyDialogs] = useState([])

  useEffect(() => {
    // забрать id пользователей из dialogsUsers/myUserId/dialogs получать их при помощи события value
    //
    // по id достать из базы данных тех пользователей с кем у меня диалог из fairStore
    // записать этих пользователей в myDialogs
    // при клике на пользователя с кем у меня диалог получать ключ диалога из dialogsUsers/myUserId/dialogs/userId
    // при помощи ключа dialogID получать сообщения из messages/dialogID
  }, [])

  useEffect(() => {
    getAllUsersFireStore(myUserId)
      .then((users) => setDialogUserList(users))
  }, [])

  // useEffect(() => {
  //   if (currentDialogUser.email && !dialogs[currentDialogUser.email]) {
  //     createDialog(myEmail, currentDialogUser.email)
  //   } else {

  //   }
  // }, [currentDialogUser])

  const onSelectDialog: TypeOnSelectDialog = (email, userName, userId) => {
    setCurrentDialogUser({ email, userName, userId })
    addDialog(myUserId, userId)
  }

  return (
    <div className={classes.main}>
      <div className={classes.left}>

        <MenuDialogs
          currentDialogUser={currentDialogUser}
          dialogUserList={dialogUserList}
          onSelectDialog={onSelectDialog}
        />

      </div>
      <div className={classes.right}>

        <Dialog
          currentDialogUser={currentDialogUser}
          dialogId={dialogId}
        />

      </div>
    </div>
  )
}

