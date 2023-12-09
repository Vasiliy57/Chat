import { useRef, useState } from 'react'
import { useAppSelector } from '@shared/hooks'

import { Button, CustomInput } from '@shared/ui'
import { AttachFile } from './components/AttachFile/AttachFile'
import EmojiPicker, { Categories } from 'emoji-picker-react'

import { preActionSendMessage } from './utils/preActionSendMessage'
import { Theme } from 'emoji-picker-react'

import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { ICONS } from '@shared/constants/icons'

import classes from './createMessage.module.css'
export const CreateMessage: React.FC = () => {
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
  const isExistingUserInfo =
    email && userName && userId && currentDialogUser && currentDialogUser.userId

  const onSendMessage = async () => {
    const childrens = refCustomInput.current?.childNodes
    let messageText = ''
    childrens?.forEach((el) => {
      if (typeof el.nodeValue === 'string') {
        messageText += el.nodeValue
      } else if (el.nodeName === 'IMG') {
        messageText += (el as HTMLImageElement).getAttribute('data-unified')
      } else if (el.nodeName === 'DIV') {
        el.childNodes.forEach((child) => {
          console.log(child)
        })
        messageText += `
        `
      }
    })

    refCustomInput!.current!.innerText = ''
    const isNewDialog = !currentDialogId && !!currentDialogUser
    if (isExistingUserInfo) {
      await preActionSendMessage({
        type: 'text',
        arguments: {
          content: messageText,
          dialogId: currentDialogId!,
          email: email,
          userName: userName,
          smileDetector: smileDetector.current,
        },
        isNewDialog,
        myUserId: userId,
        userId: currentDialogUser.userId,
      })
    }
    setIsEmoji(false)
  }

  const onIsEmoji = () => {
    setIsEmoji(!isEmoji)
  }
  const onHandlerEmoji = (emoji: {
    emoji: string
    imageUrl: string
    unified: string
  }) => {
    refCustomInput.current!.innerHTML += `<img src="${emoji.imageUrl}" data-unified="${emoji.emoji}" style="width: 30px;"/>`

    if (!smileDetector.current[emoji.emoji]) {
      smileDetector.current[emoji.emoji] = emoji.unified
    }

    // refCustomInput.current?.focus()
  }
  const onHandlerInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const isNewDialog = !currentDialogId && !!currentDialogUser

    if (isExistingUserInfo) {
      await preActionSendMessage({
        type: 'file',
        arguments: {
          content: file.type,
          dialogId: currentDialogId!,
          email: email,
          userName: userName,
          smileDetector: smileDetector.current,
        },
        file,
        isNewDialog,
        myUserId: userId,
        userId: currentDialogUser.userId,
      })
    }

    refCustomInput!.current!.innerText = ''
    setIsEmoji(false)
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
            <CustomInput ref={refCustomInput} />
            <div className={classes.buttons}>
              <Button
                onClick={() => {}}
                buttonType={BUTTON_TYPE.ICON}
                iconName={ICONS.VOICE}
                buttonClassName={BUTTON_CLASS_NAME.ICON}
              />
              <AttachFile onHandlerInputFile={onHandlerInputFile} />
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
