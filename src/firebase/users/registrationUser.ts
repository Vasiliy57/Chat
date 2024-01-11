import { showNotification } from '@shared/utils'
import { usersRef } from '../fireStore'
import { doc, setDoc } from 'firebase/firestore'

export const registrationUser = async (
  email: string,
  userName: string,
  userId: string,
  emailVerified: boolean
) => {
  try {
    setDoc(doc(usersRef, userId), {
      email,
      userName,
      userId,
      emailVerified,
      avatar: null,
      infoAboutMe: null,
      number: null,
      address: null,
    })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
  }
}
