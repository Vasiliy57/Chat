
import classes from './main.module.css'
import { useAppSelector } from '@shared/hooks'
import { useState } from 'react'
import { TypeOnSelectDialog } from './types'
import { addDialog } from '@/firebase/users'
import { Dialog, MenuDialogs } from '@widgets/chat'
import { IUser } from '@/entites/chat/dialogs/types'

export const Chat: React.FC = () => {
  const { email: myEmail, userId: myUserId } = useAppSelector(state => state.ProfileReducer.user)
  const [currentDialogUser, setCurrentDialogUser] = useState<IUser | null>(null) // redux

  const onSelectDialog: TypeOnSelectDialog = (email, userName, userId) => {
    setCurrentDialogUser({ email, userName, userId })

  }   // redux

  return (
    <div className={classes.main}>

      <MenuDialogs
        currentDialogUser={currentDialogUser}
        onSelectDialog={onSelectDialog}
        myUserId={myUserId}
      />
      <Dialog
        currentDialogUser={currentDialogUser}
        myUserId={myUserId}
      />
    </div>
  )
}

// забрать id пользователей из dialogsUsers/myUserId/dialogs получать их при помощи события value
//
// по id достать из базы данных тех пользователей с кем у меня диалог из fairStore
// записать этих пользователей в myDialogs
// при клике на пользователя с кем у меня диалог получать ключ диалога из dialogsUsers/myUserId/dialogs/userId
// при помощи ключа dialogID получать сообщения из messages/dialogID


// Вопросы
// myUserId в redux имеет null