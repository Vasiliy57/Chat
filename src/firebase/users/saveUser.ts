import { doc, setDoc } from "firebase/firestore"
import { usersRef } from "../fireStore"

export const saveUser = async (email: string, userName: string) => {
  try {
    setDoc(doc(usersRef, email), {
      email,
      userName,
    })

  } catch (e) {
    console.error("Error adding document: ", e)
  }
}