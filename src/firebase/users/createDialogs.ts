import { dbRealTime } from '../realTimeDataBase'
import { ref, set } from 'firebase/database'

export const createDialogs = async (userId: string | null) => {
  set(ref(dbRealTime, 'dialogsUsers/' + userId), {
    dialogs: {
      init: 'initializing a dialogs object',
    },
  })
}
