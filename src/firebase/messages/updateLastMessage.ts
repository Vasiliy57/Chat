import { dbRealTime } from '../realTimeDataBase'
import { ref, update } from 'firebase/database'

export const updateLastMessage = (
  isRead: boolean,
  myUserId: string,
  userId: string
) => {
  const updates = {
    ['dialogsUsers/' +
    myUserId +
    '/dialogs' +
    '/' +
    userId +
    '/lastMessage' +
    '/isRead']: isRead,
    ['dialogsUsers/' +
    userId +
    '/dialogs' +
    '/' +
    myUserId +
    '/lastMessage' +
    '/isRead']: isRead,
  }
  return update(ref(dbRealTime), updates)
}
