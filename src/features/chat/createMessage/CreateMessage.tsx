import { Button, CustomInput } from '@shared/ui'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { addDialog } from '@/firebase/users'
import classes from './createMessage.module.css'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { ICONS } from '@shared/constants/icons'
import EmojiPicker, { Categories } from 'emoji-picker-react'
import { Theme } from 'emoji-picker-react'

export const CreateMessage: React.FC = () => {
  const dispatch = useAppDispatch()
  const refCustomInput = useRef<HTMLDivElement>(null)

  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  const currentDialogId = useAppSelector(
    (state) => state.chatSlice.currentDialogId
  )
  const { email, userId, userName } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const [contentMessage, setContentMessage] = useState<string>('')
  const [emojiInMessage, setEmojiInMessage] = useState<string>('')
  const [isEmoji, setIsEmoji] = useState<boolean>(false)
  const smileDetector = useRef<Record<string, string>>({})

  const onSendMessage = () => {
    if (!currentDialogId && contentMessage.trim() && currentDialogUser) {
      addDialog(userId, currentDialogUser.userId)
        .then((data) => {
          dispatch(setCurrentDialogId(data))
          return data
        })
        .then((dialogId) => {
          sendMessageDataBase(
            contentMessage,
            'text',
            dialogId,
            email!,
            userName!,
            smileDetector.current
          )
        })
    } else {
      sendMessageDataBase(
        contentMessage,
        'text',
        currentDialogId!,
        email!,
        userName!,
        smileDetector.current
      )
    }

    setContentMessage('')
    setEmojiInMessage('')
    setIsEmoji(false)

    setTimeout(() => {
      refCustomInput.current!.innerText = ''
    }, 300)
  }

  const onHandlerInput = (e) => {
    setContentMessage(e.currentTarget.textContent)
  }

  const onIsEmoji = () => {
    setIsEmoji(!isEmoji)
  }
  const onHandlerEmoji = (emoji: { emoji: string; unified: string }) => {
    setEmojiInMessage((prev) => {
      return prev + emoji.emoji
    })
    setContentMessage((prev) => {
      return prev + emoji.emoji
    })

    if (!smileDetector.current[emoji.emoji]) {
      smileDetector.current[emoji.emoji] = emoji.unified
    }

    refCustomInput.current?.focus()
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
              onHandlerInput={onHandlerInput}
              emojiInMessage={emojiInMessage}
              smileDetector={smileDetector}
              refCustomInput={refCustomInput}
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
