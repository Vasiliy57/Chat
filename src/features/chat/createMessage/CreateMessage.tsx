import { Button, Textarea } from '@shared/ui'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { addDialog } from '@/firebase/users'
import classes from './createMessage.module.css'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'
import {
  BUTTON_TYPE,
  BUTTON_CLASS_NAME,
  TEXTAREA_CLASS_NAME,
} from '@shared/constants'
import { ICONS } from '@shared/constants/icons'

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

  const onHandlerInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextMessage(e.target.value)
  }

  return (
    <div className={classes.typeMessage}>
      {currentDialogUser.email ? (
        <>
          <Button
            onClick={() => {}}
            buttonType={BUTTON_TYPE.ICON}
            iconName={ICONS.SMILE}
            buttonClassName={BUTTON_CLASS_NAME.ICON}
            styleBtn={{ height: '50px' }}
          />
          <Textarea
            onChange={onHandlerInput}
            textareaClassName={TEXTAREA_CLASS_NAME.MESSAGE}
            value={textMessage}
            placeholder="Type message..."
          />

          <div className={classes.buttons}>
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.VOICE}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
            />
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.ATTACH}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
            />
            <Button
              buttonType={BUTTON_TYPE.BUTTON_ICON}
              content="Send"
              onClick={onSendMessage}
              iconName={ICONS.SEND}
              buttonClassName={BUTTON_CLASS_NAME.SEND}
              widthIcon="18px"
              heightIcon="18px"
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
