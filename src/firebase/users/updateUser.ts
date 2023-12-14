import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../fireStore'

export const updateUser = async (
  userId: string,
  avatar: string | null,
  infoAboutMe: string | null,
  number: string,
  address: string
) => {
  const userRef = doc(db, 'users', userId)

  await updateDoc(userRef, {
    avatar,
    infoAboutMe,
    number,
    address,
  })
}
