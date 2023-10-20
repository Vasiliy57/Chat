
import { Button, ButtonIcon } from '@shared/ui'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { addDialog } from '@/firebase/users'
import classes from './createMessage.module.css'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { getCurrentDate } from '@shared/utils/currentDate'
import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'

export const CreateMessage: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentDialogUser = useAppSelector(state => state.chatSlice.currentDialogUser)
  const currentDialogId = useAppSelector(state => state.chatSlice.currentDialogId)
  const { email, userId, userName } = useAppSelector(state => state.ProfileReducer.user)
  const [textMessage, setTextMessage] = useState<string>('')


  const onSendMessage = () => {
    if (!currentDialogId && textMessage.trim()) {
      addDialog(userId, currentDialogUser.userId)
        .then(data => {
          dispatch(setCurrentDialogId(data))
          return data
        })
        .then((dialogId) => sendMessageDataBase(textMessage, 'text', dialogId, email!, userName!))
    } else {
      sendMessageDataBase(textMessage, 'text', currentDialogId!, email!, userName!)
    }
    setTextMessage('')

  }

  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
  }

  const styleBtnSend = {
    display: 'flex',
    gap: '10px',
    fontSize: '2rem',
    fontWeight: 400,
    padding: '15px 18px',
    lineHeight: 1,
  }

  return (
    <div className={classes.TypeMessage}>
      {
        currentDialogUser.email
          ?
          <>
            <input className={classes.input} type='text' placeholder='Type message...' onChange={onHandlerInput} value={textMessage} />
            <span className={classes.smile}><ButtonIcon name='smile' onClick={() => { }} /></span>
            <div className={classes.buttons}>
              <ButtonIcon name='voice' onClick={() => { }} />
              <ButtonIcon name='attach' onClick={() => { }} />
              <Button name='Send' onClick={onSendMessage} style={styleBtnSend} />
            </div>
          </>
          : null
      }

    </div>
  )
}

