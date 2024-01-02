import { dbRealTime } from '../realTimeDataBase'
import { ref, onValue } from 'firebase/database'

export const getMyDialogs = (myUserId: string | null) => {
  let result: string[] = []

  const myDialogsRef = ref(dbRealTime, 'dialogsUsers/' + myUserId + '/dialogs')
  onValue(myDialogsRef, async (snapshot) => {
    const data = await snapshot.val()
    result = Object.keys(data)
  })

  return result
}
