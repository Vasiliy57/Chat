import { app } from './config'
import { getFirestore, collection } from 'firebase/firestore'

export const db = getFirestore(app)
export const usersRef = collection(db, 'users')
