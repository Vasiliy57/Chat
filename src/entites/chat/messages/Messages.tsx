import { useRef } from 'react'
import { useAppSelector, useListMessages } from '@shared/hooks'
import { useInView } from 'react-intersection-observer'

import { Message } from '@shared/components'

import classes from './style.module.css'

export const Messages: React.FC = () => {
  const messagesElement = useRef<HTMLDivElement | null>(null)

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

  return (
    <div className={classes.messages} ref={messagesElement} id="scrollableDiv">
      <div className={classes.listMessages}>
        {listMessages ? (
          <>
            {listMessages.map((message) => {
              const isMyMessage =
                message.email === myEmail ||
                message.email.toLowerCase() === myEmail!.toLowerCase()

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
                  key={message.date}
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
        <div ref={refInView} className={classes.inView}></div>
      </div>
    </div>
  )
}
