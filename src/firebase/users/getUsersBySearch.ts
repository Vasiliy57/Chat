import { db } from '../fireStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IUser } from '@pages/types'

export const getUsersBySearch = async (
  searchName: string,
  userId: string | null
): Promise<IUser[]> => {
  let q = null
  if (searchName) {
    q = query(collection(db, 'users'), where('userName', '>=', `${searchName}`))
  } else {
    q = query(collection(db, 'users'), where('userId', '!=', `${userId}`))
  }

  const querySnapshot = await getDocs(q)

  const users: IUser[] = []
  querySnapshot.forEach((doc) => {
    users.push(doc.data() as IUser)
  })

  return users
}
