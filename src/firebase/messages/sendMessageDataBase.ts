import { ref, child, push, update } from 'firebase/database'
import { dbRealTime } from '../realTimeDataBase'

export const sendMessageDataBase = (
  content: string,
  type: string,
  dialogId: string,
  email: string,
  userName: string,
  smileDetector?: Record<string, string>
) => {
  const message = {
    type,
    content,
    date: Math.floor(new Date().getTime() / 1000),
    email,
    userName,
    smileDetector,
  }

  // Get a key for a new Post.
  const newMessageKey = push(
    child(ref(dbRealTime), 'messages/' + dialogId + '/')
  ).key

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {
    ['messages/' + dialogId + '/' + 'allMessages/' + newMessageKey]: message,
    ['messages/' + dialogId + '/' + 'lastMessage']: message,
  }

  return update(ref(dbRealTime), updates)
}
