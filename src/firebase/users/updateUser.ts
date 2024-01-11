import { showNotification } from '@shared/utils'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../fireStore'

export const updateUser = async (
  userId: string,
  avatar: string | null,
  infoAboutMe: string | null,
  number: string,
  address: string
) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      avatar,
      infoAboutMe,
      number,
      address,
    })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
  }
}
