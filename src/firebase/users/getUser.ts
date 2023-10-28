import { doc, getDoc } from 'firebase/firestore'
import { db } from '../fireStore'

interface IUser {
  email: string | null
  userName: string | null
  userId: string
}

export const getUser = async (userId: string): Promise<IUser | null> => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return userSnap.data() as IUser
  } else {
    console.log('No such document!')
  }
  return null
}
