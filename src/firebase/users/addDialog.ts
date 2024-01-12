import { showNotification } from '@shared/utils'
import { dbRealTime } from '../realTimeDataBase'
import { ref, update } from 'firebase/database'
import { uniqueId } from '@shared/utils/uniqueId'

export const addDialog = async (
  myUserId: string | null | undefined,
  userId: string | null
) => {
  try {
    const dialogId = 'dialogsID-' + uniqueId()

    // const updates: any = {}
    // updates['dialogsUsers/' + myUserId + '/dialogs/' + userId + '/dialogId'] =
    //   dialogId
    // updates['dialogsUsers/' + userId + '/dialogs/' + myUserId + '/dialogId'] =
    //   dialogId
    // updates['messages/' + dialogId] = []

    const updates = {
      ['dialogsUsers/' + myUserId + '/dialogs/' + userId + '/dialogId']:
        dialogId,
      ['dialogsUsers/' + userId + '/dialogs/' + myUserId + '/dialogId']:
        dialogId,
      ['messages/' + dialogId]: [],
    }

    await update(ref(dbRealTime), updates)
    return dialogId
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
    return ''
  }
}
