import { ref, child, push, update } from "firebase/database";
import { dbRealTime } from "../realTimeDataBase";
import { uniqueId } from "@shared/utils/uniqueId";
export const addDialog = async (myUserId: string | null | undefined, userId: string | null) => {

  const dialogId = 'dialogsID-' + uniqueId()



  // Get a key for a new Post.
  // const newKey = push(child(ref(dbRealTime), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates: any = {}
  updates['dialogsUsers/' + myUserId + '/dialogs/' + userId] = dialogId
  updates['dialogsUsers/' + userId + '/dialogs/' + myUserId] = dialogId
  updates['messages/' + dialogId] = []
  // updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  await update(ref(dbRealTime), updates);
  return dialogId
}