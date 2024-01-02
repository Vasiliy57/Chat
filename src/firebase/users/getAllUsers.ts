import { db } from '../fireStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IUser } from '@pages/types'

export const getAllUsers = async (userId: string | null): Promise<IUser[]> => {
  let q = null
  q = query(collection(db, 'users'), where('userId', '!=', `${userId}`))
  const querySnapshot = await getDocs(q)

  const users: IUser[] = []
  querySnapshot.forEach((doc) => {
    users.push(doc.data() as IUser)
  })

  return users
}
