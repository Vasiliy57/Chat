
import { Button, ButtonIcon } from '@shared/ui'

import classes from './createMessage.module.css'
import { ICreateMessage } from './types'
import { uniqueId } from '@shared/utils/uniqueId'
// import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'
import { useState } from 'react'
import { useAppSelector } from '@shared/hooks'
import { addDialog } from '@/firebase/users'


export const CreateMessage: React.FC<ICreateMessage> = ({ currentDialogUser, dialogId, setDialogId }) => {
  const { email, userId } = useAppSelector(state => state.ProfileReducer.user)

  const [textMessage, setTextMessage] = useState<string>(' ')

  const styleBtnSend = {
    display: 'flex',
    gap: '10px',
    fontSize: '2rem',
    fontWeight: 400,
    padding: '15px 18px',
    lineHeight: 1,
  }

  const currentUser = currentDialogUser.email || null

  const onSendMessage = () => {

    if (!dialogId) {
      addDialog(userId, currentDialogUser.userId)
        .then(data => console.log(data)
        )
      console.log(1);

    }
    console.log(2);

    const messagesId = dialogId

    // sendMessageDataBase(messagesId, email, textMessage)
  }

  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
  }

  return (
    <div className={classes.TypeMessage}>
      {
        currentUser
          ?
          <>
            <input className={classes.input} type='text' placeholder='Type message...' onChange={onHandlerInput} />
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

