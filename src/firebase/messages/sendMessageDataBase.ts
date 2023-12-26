import { dbRealTime } from '../realTimeDataBase'
import { ref, child, push, update } from 'firebase/database'

export const sendMessageDataBase = (
  content: string,
  type: string,
  dialogId: string,
  email: string,
  userName: string,
  smileDetector: Record<string, string> = {},
  id: string = ''
) => {
  const message = {
    type,
    content,
    date: Math.floor(new Date().getTime() / 1000),
    email,
    userName,
    smileDetector,
    id,
  }
  const lastMessage = { ...message, isRead: false }

  // Get a key for a new Post.
  const newMessageKey = push(
    child(ref(dbRealTime), 'messages/' + dialogId + '/')
  ).key

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {
    ['messages/' + dialogId + '/' + 'allMessages/' + newMessageKey]: message,
    ['messages/' + dialogId + '/' + 'lastMessage']: lastMessage,
  }

  return update(ref(dbRealTime), updates)
}
