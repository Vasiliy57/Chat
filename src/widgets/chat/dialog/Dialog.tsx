import { Header, Messages } from "@/entites/chat"
import { CreateMessage } from "@features/index"
import { DialogProps } from "./types"
import { useState, useEffect } from 'react'

import classes from './dialog.module.css'
import { getDialogId } from "@/firebase/messages/getMessagesDataBase"
export const Dialog: React.FC<DialogProps> = ({ currentDialogUser, myUserId }) => {
  const [listDialogs, setListDialogs] = useState([])
  const [currentMessages, setCurrentMessages] = useState<null | string[]>([])
  const [dialogId, setDialogId] = useState<null | string>(null)


  useEffect(() => {
    if (currentDialogUser) {
      getDialogId(myUserId, currentDialogUser.userId)
        .then(data => setDialogId(data))
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
      <Header currentDialogUser={currentDialogUser} />
      <Messages currentDialogUser={currentDialogUser} dialogId={dialogId} />
      <CreateMessage currentDialogUser={currentDialogUser} dialogId={dialogId} setDialogId={setDialogId} />
    </div>
  )
}

