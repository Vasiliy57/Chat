import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { useEffect } from 'react'
import { useState } from 'react'

import { ConvertEmojiContent } from '@shared/utils'

import moment from 'moment'
import { setCurrentDialogUser } from '@shared/store/chat/chat'
import { getDialogId } from '@/firebase/users/getDialogId'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import { ILastMessage, UserProps } from './types'

import userImg from '@shared/assets/images/user-img.jpg'
import classes from './user.module.css'

export const User: React.FC<UserProps> = ({
  userName,
  email,
  userId,
  myUserId,
  isSelected,
  avatar,
  myEmail,
}) => {
  const dispatch = useAppDispatch()
  const [lastMessage, setLastMessage] = useState<ILastMessage | null>(null)
  const [isReadLastMessage, setIsReadLastMessage] = useState<boolean>(false)

  const currentDialogId = useAppSelector(
    (state) => state.chatSlice.currentDialogId
  )

  const time =
    lastMessage && moment(+lastMessage.date * 1000).format('DD.MM.YY HH:mm')

  useEffect(() => {
    let unSubscribe
    getDialogId(myUserId, userId).then((dialogId) => {
      if (dialogId) {
        const messagesRef = ref(
          dbRealTime,
          'messages/' + dialogId + '/lastMessage'
        )
        unSubscribe = onValue(messagesRef, async (snapshot) => {
          const data = await snapshot.val()

          setLastMessage(data)
          data.email === myEmail
            ? setIsReadLastMessage(true)
            : setIsReadLastMessage(data.isRead)
        })
      }
    })

    return unSubscribe
  }, [currentDialogId])

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
