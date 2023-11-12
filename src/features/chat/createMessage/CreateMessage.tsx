import { Button, CustomInput, Textarea } from '@shared/ui'
import { useEffect, useRef, useState } from 'react'
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
import EmojiPicker, { Categories } from 'emoji-picker-react'
import { Theme } from 'emoji-picker-react'

export const CreateMessage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>({})
  const [emojiInMessage, setEmojiInMessage] = useState<string[]>([])

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
  const [isEmoji, setIsEmoji] = useState<boolean>(false)

  const onSendMessage = () => {
    if (!currentDialogId && textMessage.trim() && currentDialogUser) {
      addDialog(userId, currentDialogUser.userId)
        .then((data) => {
          dispatch(setCurrentDialogId(data))
          return data
        })
        .then((dialogId) => {
          sendMessageDataBase(textMessage, 'text', dialogId, email!, userName!)
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
    setIsEmoji(false)
  }

  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
  }
  const onIsEmoji = () => {
    setIsEmoji(!isEmoji)
  }
  const onHandlerEmoji = (emoji: { unified: string }) => {
    setTextMessage((prev) => {
      return prev + '№'
    })

    setEmojiInMessage((prev) => {
      return [...prev, emoji.unified]
    })

    inputRef.current.focus()
  }

  return (
    <div>
      <div className={classes.typeMessage}>
        {currentDialogUser?.email ? (
          <>
            <Button
              onClick={onIsEmoji}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.SMILE}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
              styleBtn={{ height: '50px' }}
            />
            <CustomInput
              onChange={onHandlerInput}
              value={textMessage}
              inputRef={inputRef}
              emojiInMessage={emojiInMessage}
              setEmojiInMessage={setEmojiInMessage}
            />
            {/* <Textarea
              onChange={onHandlerInput}
              textareaClassName={TEXTAREA_CLASS_NAME.MESSAGE}
              value={textMessage}
              placeholder="Type message..."
            ></Textarea> */}
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
      {!isEmoji || (
        <EmojiPicker
          theme={Theme.DARK}
          width={'100%'}
          height={'300px'}
          lazyLoadEmojis={false}
          onEmojiClick={onHandlerEmoji}
          searchDisabled={true}
          categories={[
            { category: Categories.SMILEYS_PEOPLE, name: 'Faces...' },
          ]}
        />
      )}
    </div>
  )
}
