import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '.'
import { IMessage } from '@/entites/chat/messages/types'
import { showNotification } from '@shared/utils'

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

import { updateLastMessage } from '@/firebase/messages/updateLastMessage'


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
  const { email: myEmail, userId: myUserId } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const userId = useAppSelector(
    (state) => state.chatSlice.currentDialogUser?.userId
  )

  useEffect(() => {
    const queryFirstLoadMessages = query(
      ref(dbRealTime, 'messages/' + currentDialogId + '/allMessages'),
      limitToLast(15)
    )

    const queryMessage = query(
      ref(dbRealTime, 'messages/' + currentDialogId + '/allMessages'),
      limitToLast(1)
    )

    if (currentDialogId) {
      get(queryFirstLoadMessages)
        .then((response) => {
          const firstLoadValue = response.val()
          if (firstLoadValue) {
            const messages: IMessage[] = Object.values(firstLoadValue)

            if (messages[0]?.email != myEmail && myUserId && userId) {
              updateLastMessage(true, myUserId, userId)
            }

            setListMessages(messages.reverse())
          }

          onValue(queryMessage, async (snapshot) => {
            const lastLoadValue = await snapshot.val()

            if (
              (lastLoadValue && !isFirstLoadMessages.current) ||
              !firstLoadValue
            ) {
              const messages: IMessage[] = Object.values(lastLoadValue)

              if (messages[0].email != myEmail && myUserId && userId) {
                updateLastMessage(true, myUserId, userId)
              }

              setListMessages((prev) => {
                return [...messages, ...prev]
              })
            }
            isFirstLoadMessages.current = false
          })
        })
        .catch((error) => showNotification('error', error.message))

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
      lastMessageDate.current = parseInt(listMessages.at(-1)!.date)

      const queryLoadMessages = query(
        ref(dbRealTime, 'messages/' + currentDialogId + '/allMessages'),
        orderByChild('date'),
        limitToLast(6),
        endBefore(lastMessageDate.current)
      )
      get(queryLoadMessages)
        .then((data) => {
          if (data.val()) {
            const newListMessages: IMessage[] = Object.values(data.val())

            setListMessages((prev) => {
              return [...prev, ...newListMessages.reverse()]
            })
          }
        })
        .catch((error) => showNotification('error', error.message))
    }
  }, [inView])

  return listMessages
}
