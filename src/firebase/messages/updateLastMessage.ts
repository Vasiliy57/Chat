import { dbRealTime } from '../realTimeDataBase'
import { ref, update } from 'firebase/database'

export const updateLastMessage = (
  isRead: boolean,
  myUserId: string,
  userId: string
) => {
  const keyIsReadMessage =
    'dialogsUsers/' +
    myUserId +
    '/dialogs' +
    '/' +
    userId +
    '/lastMessage' +
    '/isRead'
  const keyIsReadMessageForUser =
    'dialogsUsers/' +
    userId +
    '/dialogs' +
    '/' +
    myUserId +
    '/lastMessage' +
    '/isRead'

  const updates = {
    [keyIsReadMessage]: isRead,
    [keyIsReadMessageForUser]: isRead,
  }
  return update(ref(dbRealTime), updates)
}
