

import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { dbRealTime } from "../realTimeDataBase";

export const getDialogId = async (myUserId: string | null, userId: string | null) => {
  let dialogId = null

  const dbRef = ref(dbRealTime);

  await get(child(dbRef, `dialogsUsers/${myUserId}/dialogs/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dialogId = snapshot.val()
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  return dialogId
}
