import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

import { CreateMessage } from '@features/index'
import { Header, Messages } from '@/entites/chat'

import { getDialogId } from '@/firebase/users/getDialogId'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { showNotification } from '@shared/utils'

import classes from './dialog.module.css'

export const Dialog: React.FC = () => {
  const dispatch = useAppDispatch()

  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  const myUserId = useAppSelector((state) => state.ProfileReducer.user.userId)
  const isCurrentDialogUser: boolean = !!currentDialogUser

  useEffect(() => {
    if (currentDialogUser?.email) {
      getDialogId(myUserId, currentDialogUser.userId)
        .then((data) => dispatch(setCurrentDialogId(data)))
        .catch((error) => {
          showNotification('error', error.message)
        })
    }
  }, [currentDialogUser])

  if (!currentDialogUser) {
    return (
      <div className={classes.dialog}>
        <div className={classes.text}>You have not selected any dialog</div>
      </div>
    )
  }
  return (
    <div
      className={classes.dialog}
      style={isCurrentDialogUser ? { display: 'flex' } : {}}
    >
      <Header />
      <Messages />
      <CreateMessage />
    </div>
  )
}
