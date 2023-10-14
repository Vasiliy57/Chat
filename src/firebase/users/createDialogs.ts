import { ref, set } from "firebase/database"
import { dbRealTime } from "../realTimeDataBase";

export const createDialogs = async (userId: string | null) => {

  // const dialogId = uniqueId()
  console.log('Work createDialogs');
  // const dialogId = 'dialogsID-' + uniqueId()

  set(ref(dbRealTime, 'dialogsUsers/' + userId), {
    dialogs: {
      init: 'initializing a dialogs object'
    }
  });

  // set(ref(dbRealTime, 'dialogsUsers/' + myEmail + '/dialogs'), {
  //   [myEmail]: dialogId
  // });

  // set(ref(dbRealTime, 'messagesAll/'), {
  //   [dialogId]: []
  // })
}




