import { doc, setDoc } from "firebase/firestore"
import { usersRef } from "../fireStore"

export const saveUser = async (email: string, userName: string, userId: string) => {
  try {
    setDoc(doc(usersRef, userId), {
      email,
      userName,
      userId
    })

  } catch (e) {
    console.error("Error adding document: ", e)
  }
}