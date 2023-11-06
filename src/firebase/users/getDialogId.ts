import { ref, child, get } from 'firebase/database'
import { dbRealTime } from '../realTimeDataBase'

export const getDialogId = async (
  myUserId: string | null,
  userId: string | null
) => {
  let dialogId: string | null = null

  const dbRef = ref(dbRealTime)

  await get(child(dbRef, `dialogsUsers/${myUserId}/dialogs/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dialogId = snapshot.val()
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })
  return dialogId
}
