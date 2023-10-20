import { Dialog, MenuDialogs } from '@widgets/chat'
import classes from './main.module.css'

export const Chat: React.FC = () => {
  return (
    <div className={classes.main}>
      <MenuDialogs />
      <Dialog />
    </div>
  )
}

// забрать id пользователей из dialogsUsers/myUserId/dialogs получать их при помощи события value
//
// по id достать из базы данных тех пользователей с кем у меня диалог из fairStore
// записать этих пользователей в myDialogs
// при клике на пользователя с кем у меня диалог получать ключ диалога из dialogsUsers/myUserId/dialogs/userId
// при помощи ключа dialogID получать сообщения из messages/dialogID

// create chatSlice, replaced in components useState with redux state