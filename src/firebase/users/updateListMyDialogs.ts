import { showNotification } from '@shared/utils'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../fireStore'

export const updateListMyDialogs = async (array: string[]): Promise<any> => {
  try {
    const q = query(collection(db, 'users'), where('userId', 'in', array))
    const querySnapshot = await getDocs(q)
    const users: any = []
    querySnapshot.forEach((doc) => {
      users.push(doc.data())
    })
    return users
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
  }
}
