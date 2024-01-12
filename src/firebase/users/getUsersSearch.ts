import { showNotification } from '@shared/utils'
import { db } from '../fireStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IUser } from '@pages/types'

export const getUsersSearch = async (userId: string): Promise<IUser[]> => {
  try {
    let q = null
    q = query(collection(db, 'users'), where('userId', 'not-in', [userId]))
    const querySnapshot = await getDocs(q)

    const users: IUser[] = []
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as IUser)
    })

    return users
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
    return []
  }
}
