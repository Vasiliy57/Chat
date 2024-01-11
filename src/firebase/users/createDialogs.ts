import { showNotification } from '@shared/utils'
import { dbRealTime } from '../realTimeDataBase'
import { ref, set } from 'firebase/database'

export const createDialogs = async (userId: string | null) => {
  try {
    set(ref(dbRealTime, 'dialogsUsers/' + userId), {
      dialogs: {
        init: 'initializing a dialogs object',
      },
    })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
  }
}
