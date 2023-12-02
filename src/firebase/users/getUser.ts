import { db } from '../fireStore'
import { doc, getDoc } from 'firebase/firestore'

interface IUser {
  email: string | null
  userName: string | null
  userId: string
  avatar: string | null
  infoAboutMe: string | null
  number: string | null
  address: string | null
  emailVerified: boolean
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
