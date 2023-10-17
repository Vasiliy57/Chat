


import { Message } from '@/shared/components'
import classes from './messages.module.css'
import { IMessages } from './types'
import { useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'

export const Messages: React.FC<IMessages> = ({ currentDialogUser, dialogId }) => {
  useEffect(() => {
    if (dialogId) {
      const messagesRef = ref(dbRealTime, 'messages/' + dialogId)
      onValue(messagesRef, async (snapshot) => {
        const data = await snapshot.val()
        console.log(data);
      })
    }
  }, [dialogId])

  const currentUser = currentDialogUser.email || null
  return (
    <div className={classes.messages}>
      {
        currentUser
          ?
          <>
            {/* messages list */}
          </>
          : null
      }

    </div>
  )
}

