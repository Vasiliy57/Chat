import { ref, child, push, update } from "firebase/database";
import { dbRealTime } from "../realTimeDataBase";
import { uniqueId } from "@shared/utils/uniqueId";
export const addDialog = (myUserId: string | null | undefined, userId: string | null) => {

  console.log('Work addDialog');


  const dialogId = 'dialogsID-' + uniqueId()



  // Get a key for a new Post.
  // const newKey = push(child(ref(dbRealTime), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates: any = {}
  updates['dialogsUsers/' + myUserId + '/dialogs/' + userId] = dialogId
  updates['dialogsUsers/' + userId + '/dialogs/' + myUserId] = dialogId
  updates['messages/' + dialogId] = { init: 'init messages' }
  // updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return update(ref(dbRealTime), updates);
}