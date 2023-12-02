import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useAppSelector } from '@shared/hooks'

import { Message } from '@shared/components'

import { off, onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import { IMessage } from './types'

import classes from './messages.module.css'

export const Messages: React.FC = () => {
  const messagesEndRef = useRef<HTMLInputElement>(null)

  const myEmail = useAppSelector((state) => state.ProfileReducer.user.email)
  const currentDialogId = useAppSelector(
    (state) => state.chatSlice.currentDialogId
  )
  const userAvatar = useAppSelector(
    (state) => state.chatSlice.currentDialogUser?.avatar
  )
  const myAvatar = useAppSelector((state) => state.ProfileReducer.user.avatar)

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
            const isMyMessage = message.email === myEmail
            const avatar = isMyMessage ? myAvatar : userAvatar

            return (
              <Message
                avatar={avatar}
                isMyMessage={isMyMessage}
                content={message.content}
                date={message.date}
                typeMessage={message.type}
                userName={message.userName}
                smileDetector={message.smileDetector}
                key={index}
                id={message.id}
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
