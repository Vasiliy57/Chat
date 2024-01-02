import { useAppDispatch } from '@shared/hooks'
import { useEffect } from 'react'
import { useState } from 'react'

import { ConvertEmojiContent } from '@shared/utils'

import moment from 'moment'
import { setCurrentDialogUser } from '@shared/store/chat/chat'
import { UserProps } from './types'

import userImg from '@shared/assets/images/user-img.jpg'
import classes from './user.module.css'

export const User: React.FC<UserProps> = ({
  userName,
  email,
  userId,
  isSelected,
  avatar,
  myEmail,
  lastMessage,
}) => {
  const dispatch = useAppDispatch()
  const [isReadLastMessage, setIsReadLastMessage] = useState<boolean>(true)

  const time =
    lastMessage && moment(+lastMessage.date * 1000).format('DD.MM.YY HH:mm')
  useEffect(() => {
    if (lastMessage) {
      lastMessage.email === myEmail
        ? setIsReadLastMessage(true)
        : setIsReadLastMessage(lastMessage.isRead)
    }
  }, [lastMessage])

  const onHandlerClick = () => {
    dispatch(setCurrentDialogUser({ email, userName, userId, avatar }))
  }

  const currentClassName = isSelected ? 'user-select' : 'user'
  return (
    <div className={classes[currentClassName]} onClick={onHandlerClick}>
      {!isReadLastMessage ? <span className={classes.read}></span> : null}
      <img className={classes.img} src={avatar ?? userImg} alt="User avatar" />
      <div className={classes.info}>
        <div className={classes.row}>
          <div className={classes.name}>{userName}</div>
          <div className={classes.lastMessage}>
            {lastMessage?.type === 'image' ? (
              <span className={classes.lastMessageFile}>Image</span>
            ) : lastMessage?.type === 'file' ? (
              <span className={classes.lastMessageFile}>File</span>
            ) : lastMessage?.content ? (
              <ConvertEmojiContent
                content={lastMessage?.content}
                smileDetector={lastMessage?.smileDetector}
                sizeSmile={15}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.time}>{time}</div>
        </div>
      </div>
    </div>
  )
}
