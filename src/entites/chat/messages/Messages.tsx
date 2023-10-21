import { useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import { useAppSelector } from '@shared/hooks'
import { useState } from 'react'
import classes from './messages.module.css'
import { IMessage } from './types'
import { Message } from '@shared/components'
import { useRef } from 'react'

export const Messages: React.FC = () => {
  const messagesEndRef: any = useRef(null)

  const myEmail = useAppSelector(state => state.ProfileReducer.user.email)
  const currentDialogId = useAppSelector(state => state.chatSlice.currentDialogId)
  const [listMessages, setListMessages] = useState<IMessage[]>([])

  useEffect(() => {
    if (currentDialogId) {
      const messagesRef = ref(dbRealTime, 'messages/' + currentDialogId)
      onValue(messagesRef, async (snapshot) => {
        const data = await snapshot.val()
        data ? setListMessages(Object.values(data)) : null
      })
    } else {
      setListMessages([])
    }
  }, [currentDialogId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [listMessages])

  return (
    <div className={classes.messages}>
      {
        listMessages
          ?
          <>
            {listMessages.map((message, index) => {
              return <Message
                isMyMessage={message.email === myEmail}
                content={message.content}
                date={message.date}
                typeMessage={message.type}
                userName={message.userName}
                key={index}
              />
            })}
          </>
          :
          <div className={classes.notMessages}>
            You don't have any messages yet
          </div>
      }
      <div ref={messagesEndRef} />
    </div>
  )
}

