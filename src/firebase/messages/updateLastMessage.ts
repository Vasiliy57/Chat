import { dbRealTime } from '../realTimeDataBase'
import { ref, update } from 'firebase/database'

export const updateLastMessage = (isRead: boolean, dialogId: string) => {
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {
    ['messages/' + dialogId + '/' + 'lastMessage' + '/' + 'isRead']: isRead,
  }

  return update(ref(dbRealTime), updates)
}
