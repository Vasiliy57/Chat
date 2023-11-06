import { ref, onValue } from "firebase/database"
import { dbRealTime } from "../realTimeDataBase"

export const getMyDialogs = (myUserId: string | null) => {
  let result: string[] = []

  const myDialogsRef = ref(dbRealTime, 'dialogsUsers/' + myUserId + '/dialogs')
  onValue(myDialogsRef, async (snapshot) => {
    const data = await snapshot.val()
    result = Object.keys(data)

  })


  return result
}

