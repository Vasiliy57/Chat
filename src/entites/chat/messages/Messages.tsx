import { useEffect } from 'react'
import { useRef } from 'react'
import { useAppSelector, useListMessages } from '@shared/hooks'
import { useInView } from 'react-intersection-observer'

import { Message } from '@shared/components'

import classes from './messages.module.css'

export const Messages: React.FC = () => {
  const messagesElement = useRef<HTMLDivElement | null>(null)
  const heightElementMessages = useRef<number>(0)

  const myEmail = useAppSelector((state) => state.ProfileReducer.user.email)
  const currentDialogId = useAppSelector(
    (state) => state.chatSlice.currentDialogId
  )
  const userAvatar = useAppSelector(
    (state) => state.chatSlice.currentDialogUser?.avatar
  )
  const myAvatar = useAppSelector((state) => state.ProfileReducer.user.avatar)

  const { ref: refInView, inView } = useInView({
    /* Optional options */
    threshold: 0,
  })
  const listMessages = useListMessages({ inView, currentDialogId })

  useEffect(() => {
    const heightScrollDown =
      messagesElement.current!.scrollHeight - heightElementMessages.current
    messagesElement.current!.scrollTop += heightScrollDown
    heightElementMessages.current = messagesElement.current?.scrollHeight ?? 0
  }, [listMessages])

  return (
    <div className={classes.messages} ref={messagesElement}>
      <div className={classes.listMessages}>
        <div ref={refInView} className={classes.inView}></div>
        {listMessages ? (
          <>
            {listMessages.map((message, index) => {
              const isMyMessage =
                message.email === myEmail ||
                message.email.toLowerCase() === myEmail!.toLowerCase()

              const avatar = isMyMessage ? myAvatar : userAvatar
              // console.log('Message Email:', message.email)
              // console.log('MyEmail:', myEmail)
              // console.log(message.email === myEmail)

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
      </div>
    </div>
  )
}
