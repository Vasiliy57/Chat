import { useAppDispatch } from '@shared/hooks'
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
  isSelected,
  myUserId,
  avatar,
}) => {
  const [lastMessage, setLastMessage] = useState<ILastMessage | null>(null)
  const [isDialogId, setIsDialogId] = useState<boolean>(false)

  const time =
    lastMessage && moment(+lastMessage.date * 1000).format('DD.MM.YY HH:mm')
  console.log('render User')

  useEffect(() => {
    alert('Work UseEf in User')

    let unSubscribe
    getDialogId(myUserId, userId).then((dialogId) => {
      if (dialogId && !isDialogId) {
        const messagesRef = ref(
          dbRealTime,
          'messages/' + dialogId + '/lastMessage'
        )
        unSubscribe = onValue(messagesRef, async (snapshot) => {
          const data = await snapshot.val()
          setLastMessage(data)
          setIsDialogId(true)
        })
      }
    })

    return () => {
      console.log('Delete USer')

      // unSubscribe()
    }
  }, [])

  const dispatch = useAppDispatch()
  const currentClassName = isSelected ? 'user-select' : 'user'
  const onHandlerClick = () => {
    dispatch(setCurrentDialogUser({ email, userName, userId, avatar }))
  }
  return (
    <div className={classes[currentClassName]} onClick={onHandlerClick}>
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
