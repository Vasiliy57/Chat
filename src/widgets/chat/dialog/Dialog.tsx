import { Header, Messages } from "@/entites/chat"
import { CreateMessage } from "@features/index"
import classes from './dialog.module.css'
import { getDialogId } from "@/firebase/users/getDialogId"
import { useAppDispatch, useAppSelector } from "@shared/hooks"
import { setCurrentDialogId } from "@shared/store/chat/chat"
import { useEffect } from 'react'

export const Dialog: React.FC = () => {

  const dispatch = useAppDispatch()

  const currentDialogUser = useAppSelector(state => state.chatSlice.currentDialogUser)
  const myUserId = useAppSelector(state => state.ProfileReducer.user.userId)

  useEffect(() => {
    if (currentDialogUser?.email) {
      getDialogId(myUserId, currentDialogUser.userId)
        .then(data => dispatch(setCurrentDialogId(data)))
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

    <div className={classes.dialog}>
      <Header />
      <Messages />
      <CreateMessage />
    </div>
  )
}

