import { db } from '../fireStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IUser } from '@pages/types'

export const getUsersSearch = async (
  array: string[],
  userId: string
): Promise<IUser[]> => {
  let q = null
  q = query(
    collection(db, 'users'),
    where('userId', 'not-in', [...array, userId])
  )
  const querySnapshot = await getDocs(q)

  const users: IUser[] = []
  querySnapshot.forEach((doc) => {
    users.push(doc.data() as IUser)
  })

  return users
}
