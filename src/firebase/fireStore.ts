import { app } from './config'
import { getFirestore, collection } from 'firebase/firestore'

export const db = getFirestore(app)
export const usersRef = collection(db, 'users')

// export const saveUser = async (email: string, userName: string) => {
//   try {
//     setDoc(doc(usersRef, email), {
//       email,
//       userName,
//     })

//   } catch (e) {
//     console.error("Error adding document: ", e)
//   }
// }

// export const getUser = async (email: string) => {
//   const userRef = doc(db, "users", email)
//   const userSnap = await getDoc(userRef)

//   if (userSnap.exists()) {
//     return userSnap.data()
//   } else {
//     console.log("No such document!")
//   }
// }

// export const getAllUsersFireStore = async (email: string | null | undefined): Promise<any> => {

//   const q = query(collection(db, "users"), where("email", "!=", `${email}`));
//   const querySnapshot = await getDocs(q)
//   const users: any = []
//   querySnapshot.forEach((doc) => {
//     users.push(doc.data())
//   });
//   return users

// }
