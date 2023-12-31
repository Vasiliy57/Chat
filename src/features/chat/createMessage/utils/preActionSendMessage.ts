import { sendMessageDataBase } from '@/firebase/messages/sendMessageDataBase'
import imageCompression from 'browser-image-compression'
import { saveFile } from '@/firebase/storageImages/saveFile'
import { addDialog } from '@/firebase/users'
import { uniqueId } from '@shared/utils/uniqueId'
import { setCurrentDialogId } from '@shared/store/chat/chat'
import { store } from '@app/store/initialStore'
import { showNotification } from '@shared/utils'

// type MessageType = 'text' | 'image' | 'file'

interface ReqArguments {
  content: string
  dialogId: string
  email: string
  userName: string
  smileDetector?: Record<string, string>
}
interface TextMessageProps {
  type: 'text'
  arguments: ReqArguments
  isNewDialog: boolean
  myUserId: string
  userId: string
}
interface FileMessageProps {
  type: 'file'
  arguments: ReqArguments
  file: File
  isNewDialog: boolean
  myUserId: string
  userId: string
}

export const preActionSendMessage = async (
  props: TextMessageProps | FileMessageProps
) => {
  let dialogId = props.arguments.dialogId
  if (props.isNewDialog) {
    await addDialog(props.myUserId, props.userId).then((data) => {
      dialogId = data
      store.dispatch(setCurrentDialogId(dialogId))
      return data
    })
  }

  switch (props.type) {
    case 'text':
      if (props.arguments.content) {
        sendMessageDataBase(
          props.arguments.content,
          props.type,
          dialogId,
          props.arguments.email,
          props.arguments.userName,
          props.arguments.smileDetector,
          props.myUserId,
          props.userId
        )
      } else {
        showNotification('warning', 'The field cannot be empty')
      }

      return
    case 'file':
      {
        const fileId = uniqueId()
        if (/^image/.test(props.file.type)) {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          }

          const compressedFile = await imageCompression(props.file, options)

          await saveFile(compressedFile, fileId)
          await sendMessageDataBase(
            '',
            'image',
            dialogId,
            props.arguments.email,
            props.arguments.userName,
            props.arguments.smileDetector,
            props.myUserId,
            props.userId,
            fileId
          )
        } else {
          await saveFile(props.file, fileId)
          await sendMessageDataBase(
            props.arguments.content,
            'file',
            dialogId,
            props.arguments.email,
            props.arguments.userName,
            props.arguments.smileDetector,
            props.myUserId,
            props.userId,
            fileId
          )
        }
      }
      return
    default:
      break
  }
}
