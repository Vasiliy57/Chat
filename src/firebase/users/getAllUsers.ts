import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../fireStore"

export const getAllUsersFireStore = async (email: string | null | undefined): Promise<any> => {

  const q = query(collection(db, "users"), where("email", "!=", `${email}`))
  const querySnapshot = await getDocs(q)
  const users: any = []
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  return users

}