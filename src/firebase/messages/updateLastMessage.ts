import { dbRealTime } from '../realTimeDataBase'
import { ref, update } from 'firebase/database'

export const updateLastMessage = (isRead: boolean, dialogId: string) => {
  const updates = {
    ['messages/' + dialogId + '/' + 'lastMessage' + '/' + 'isRead']: isRead,
  }
  return update(ref(dbRealTime), updates)
}
