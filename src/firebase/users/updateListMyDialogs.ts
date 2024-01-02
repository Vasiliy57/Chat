import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../fireStore'

export const updateListMyDialogs = async (array: string[]): Promise<any> => {
  const q = query(collection(db, 'users'), where('userId', 'in', array))
  const querySnapshot = await getDocs(q)
  const users: any = []
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  return users
}
