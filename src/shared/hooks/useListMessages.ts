import { useEffect, useRef, useState } from 'react'
import { dbRealTime } from '@/firebase/realTimeDataBase'
import {
  endBefore,
  get,
  limitToLast,
  off,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database'
import { IMessage } from '@/entites/chat/messages/types'
interface IUseListMessages {
  inView: boolean
  currentDialogId: string | null
}

export const useListMessages = ({
  inView,
  currentDialogId,
}: IUseListMessages) => {
  const [listMessages, setListMessages] = useState<IMessage[]>([])
  const lastMessageDate = useRef<number>(new Date().getTime() / 1000)
  const isFirstLoadMessages = useRef<boolean>(true)

  useEffect(() => {
    if (currentDialogId) {
      const queryFirstLoadMessages = query(
        ref(dbRealTime, 'messages/' + currentDialogId + '/allMessages'),
        limitToLast(6)
      )

      const queryMessage = query(
        ref(dbRealTime, 'messages/' + currentDialogId + '/allMessages'),
        limitToLast(1)
      )

      get(queryFirstLoadMessages).then((data) => {
        if (data.val()) {
          const dataMessages: IMessage[] = Object.values(data.val())
          setListMessages((prev) => {
            dataMessages.pop()
            return prev.concat(dataMessages)
          })
        }
      })

      onValue(queryMessage, async (snapshot) => {
        const data = await snapshot.val()

        // if (data && !isFirstLoadMessages.current) {
        if (data) {
          const dataMessage: IMessage[] = Object.values(data)
          setListMessages((prev) => {
            return prev.concat(dataMessage)
          })
        }
        isFirstLoadMessages.current = false
      })

      return () => {
        isFirstLoadMessages.current = true
        setListMessages([])
        off(queryMessage)
      }
    } else {
      setListMessages([])
    }
  }, [currentDialogId])

  useEffect(() => {
    if (inView && listMessages.length > 0) {
      lastMessageDate.current = parseInt(listMessages[0].date)

      const queryLoadMessages = query(
        ref(dbRealTime, 'messages/' + currentDialogId + '/allMessages'),
        orderByChild('date'),
        limitToLast(6),
        endBefore(lastMessageDate.current)
      )
      get(queryLoadMessages).then((data) => {
        if (data.val()) {
          const newListMessages: IMessage[] = Object.values(data.val())

          setListMessages((prev) => {
            return newListMessages.concat(prev)
          })
        }
      })
    }
  }, [inView])

  return listMessages
}
