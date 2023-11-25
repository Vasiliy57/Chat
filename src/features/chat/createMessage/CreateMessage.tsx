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
import { AttachFile } from './components/AttachFile/AttachFile'
import imageCompression from 'browser-image-compression'
import { saveFile } from '@/firebase/storageImages/saveFile'
import { uniqueId } from '@shared/utils/uniqueId'

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
        messageText += el.dataset.unified
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
            smileDetector.current,
            ''
          )
        })
    } else {
      sendMessageDataBase(
        messageText,
        'text',
        currentDialogId!,
        email!,
        userName!,
        smileDetector.current,
        ''
      )
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
    console.log(file.type)

    if (/^image/.test(file.type)) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      }
      const imageId = uniqueId()
      const compressedFile = await imageCompression(file, options)
      await saveFile(compressedFile, imageId)
      sendMessageDataBase(
        '',
        'image',
        currentDialogId!,
        email!,
        userName!,
        smileDetector.current,
        imageId
      )
    } else {
      const fileId = uniqueId()
      await saveFile(file, fileId)
      sendMessageDataBase(
        file.type,
        'file',
        currentDialogId!,
        email!,
        userName!,
        smileDetector.current,
        fileId
      )
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
            <CustomInput refCustomInput={refCustomInput} />
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
