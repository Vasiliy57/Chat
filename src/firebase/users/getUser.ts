import { showNotification } from '@shared/utils'
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
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as IUser
    } else {
      showNotification('warning', 'No such document!')
    }
    return null
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
    return null
  }
}
