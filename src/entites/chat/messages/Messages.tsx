import { useEffect } from 'react'
import { off, onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import { useAppSelector } from '@shared/hooks'
import { useState } from 'react'
import classes from './messages.module.css'
import { IMessage } from './types'
import { Message } from '@shared/components'
import { useRef } from 'react'

export const Messages: React.FC = () => {
  const messagesEndRef = useRef<HTMLInputElement>(null)

  const myEmail = useAppSelector((state) => state.ProfileReducer.user.email)
  const currentDialogId = useAppSelector(
    (state) => state.chatSlice.currentDialogId
  )
  const [listMessages, setListMessages] = useState<IMessage[]>([])

  useEffect(() => {
    const messagesRef = ref(
      dbRealTime,
      'messages/' + currentDialogId + '/allMessages'
    )
    if (currentDialogId) {
      onValue(messagesRef, async (snapshot) => {
        const data = await snapshot.val()
        data ? setListMessages(Object.values(data)) : null
      })
    } else {
      setListMessages([])
    }

    return () => {
      off(messagesRef)
    }
  }, [currentDialogId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [listMessages])

  return (
    <div className={classes.messages}>
      {listMessages ? (
        <>
          {listMessages.map((message, index) => {
            return (
              <Message
                isMyMessage={message.email === myEmail}
                content={message.content}
                date={message.date}
                typeMessage={message.type}
                userName={message.userName}
                smileDetector={message.smileDetector}
                key={index}
              />
            )
          })}
        </>
      ) : (
        <div className={classes.notMessages}>
          You dont have any messages yet
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
