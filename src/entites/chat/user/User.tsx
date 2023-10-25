import { useAppDispatch } from '@shared/hooks'
import { ILastMessage, UserProps } from './types'
import userImg from './user-img.jpg'
import classes from './user.module.css'
import { setCurrentDialogUser } from '@shared/store/chat/chat'
import { getDialogId } from '@/firebase/users/getDialogId'
import { useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import { useState } from 'react'

export const User: React.FC<UserProps> = ({
  userName,
  email,
  img,
  userId,
  isSelected,
  myUserId,
}) => {
  const [lastMessage, setLastMessage] = useState<ILastMessage | null>(null)
  const [isDialogId, setIsDialogId] = useState<boolean>(false)

  useEffect(() => {
    getDialogId(myUserId, userId).then((dialogId) => {
      if (dialogId && !isDialogId) {
        const messagesRef = ref(
          dbRealTime,
          'messages/' + dialogId + '/lastMessage'
        )
        onValue(messagesRef, async (snapshot) => {
          const data = await snapshot.val()
          setLastMessage(data)
          setIsDialogId(true)
        })
      }
    })
  })

  const dispatch = useAppDispatch()
  const currentClassName = isSelected ? 'user-select' : 'user'
  const onHandlerClick = () => {
    dispatch(setCurrentDialogUser({ email, userName, userId }))
  }
  return (
    <div className={classes[currentClassName]} onClick={onHandlerClick}>
      <img className={classes.img} src={img ?? userImg} alt="User avatar" />
      <div className={classes.info}>
        <div className={classes.row}>
          <div className={classes.name}>{userName}</div>
          <div className={classes.lastMessage}>
            {lastMessage ? lastMessage.content : null}
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.time}>
            {' '}
            {lastMessage ? lastMessage.date : null}
          </div>
          {/* <div className={classes.count}> </div> */}
        </div>
      </div>
    </div>
  )
}
