import { Button } from '@shared/ui'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { addDialog } from '@/firebase/users'
import classes from './createMessage.module.css'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'
import { buttonTypes, classNamesBtn } from '@shared/constants/button'
import { icons } from '@shared/constants/icons'

export const CreateMessage: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  const currentDialogId = useAppSelector(
    (state) => state.chatSlice.currentDialogId
  )
  const { email, userId, userName } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const [textMessage, setTextMessage] = useState<string>('')

  const onSendMessage = () => {
    if (!currentDialogId && textMessage.trim()) {
      addDialog(userId, currentDialogUser.userId)
        .then((data) => {
          dispatch(setCurrentDialogId(data))
          return data
        })
        .then((dialogId) => {
          sendMessageDataBase(textMessage, 'text', dialogId, email!, userName!)
          console.log(textMessage, 'text', dialogId, email!, userName!)
        })
    } else {
      sendMessageDataBase(
        textMessage,
        'text',
        currentDialogId!,
        email!,
        userName!
      )
    }
    setTextMessage('')
  }

  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
  }

  return (
    <div className={classes.TypeMessage}>
      {currentDialogUser.email ? (
        <>
          <input
            className={classes.input}
            type="text"
            placeholder="Type message..."
            onChange={onHandlerInput}
            value={textMessage}
          />
          <span className={classes.smile}>
            <Button
              onClick={() => {}}
              type={buttonTypes.ICON}
              iconName={icons.SMILE}
            />
          </span>
          <div className={classes.buttons}>
            <Button
              onClick={() => {}}
              type={buttonTypes.ICON}
              iconName={icons.VOICE}
            />
            <Button
              onClick={() => {}}
              type={buttonTypes.ICON}
              iconName={icons.ATTACH}
            />
            <Button
              type={buttonTypes.BUTTON_ICON}
              content="Send"
              onClick={onSendMessage}
              iconName={icons.SEND}
              classNameBtn={classNamesBtn.SEND}
              widthIcon="18px"
              heightIcon="18px"
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
