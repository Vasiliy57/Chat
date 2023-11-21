import { Button, CustomInput } from '@shared/ui'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { addDialog } from '@/firebase/users'
import classes from './createMessage.module.css'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { ICONS } from '@shared/constants/icons'
import EmojiPicker, { Categories, Emoji } from 'emoji-picker-react'
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

  const [isEmoji, setIsEmoji] = useState<boolean>(false)
  const smileDetector = useRef<Record<string, string>>({})

  const onSendMessage = async () => {
    const text = refCustomInput.current?.innerHTML ?? ''

    const childrens = refCustomInput.current?.childNodes
    let messageText = ''

    childrens?.forEach((el) => {
      if (typeof el.nodeValue === 'string') {
        messageText += el.nodeValue
      } else {
        messageText += el.getAttribute('data-unified')
      }
    })

    refCustomInput!.current!.innerText = ''

    if (!currentDialogId && text.trim() && currentDialogUser) {
      addDialog(userId, currentDialogUser.userId)
        .then((data) => {
          dispatch(setCurrentDialogId(data))
          return data
        })
        .then((dialogId) => {
          sendMessageDataBase(
            messageText,
            'text',
            dialogId,
            email!,
            userName!,
            smileDetector.current
          )
        })
    } else {
      sendMessageDataBase(
        messageText,
        'text',
        currentDialogId!,
        email!,
        userName!,
        smileDetector.current
      )
    }

    setIsEmoji(false)
  }

  const onHandlerInput = (e) => {
    console.log('EVENT: ', e.currentTarget.textContent)
    console.log('REF: ', refCustomInput.current?.innerText)
  }

  const onIsEmoji = () => {
    setIsEmoji(!isEmoji)
  }
  const onHandlerEmoji = (emoji) => {
    refCustomInput.current!.innerHTML += `<img src="${emoji.imageUrl}" data-unified="${emoji.emoji}" style="width: 30px;"/>`

    if (!smileDetector.current[emoji.emoji]) {
      smileDetector.current[emoji.emoji] = emoji.unified
    }

    refCustomInput.current?.focus()
  }

  return (
    <div>
      <div className={classes.typeMessage}>
        {currentDialogUser?.email && (
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
              // emojiInMessage={emojiInMessage}
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
        )}
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
