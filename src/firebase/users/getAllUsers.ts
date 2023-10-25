import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../fireStore'
import { IUser } from '@pages/types'

export const getAllUsersFireStore = async (
  userId: string | null
): Promise<IUser[]> => {
  const q = query(collection(db, 'users'), where('userId', '!=', `${userId}`))
  const querySnapshot = await getDocs(q)

  const users: IUser[] = []
  querySnapshot.forEach((doc) => {
    users.push(doc.data() as IUser)
  })
  return users
}
