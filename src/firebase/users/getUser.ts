import { doc, getDoc } from "firebase/firestore"
import { db } from "../fireStore"

export const getUser = async (userId: string) => {
  const userRef = doc(db, "users", userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return userSnap.data()
  } else {
    console.log("No such document!")
  }
}