import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../storage'

export const getUserAvatar = (userId: string) => {
  getDownloadURL(ref(storage, userId))
    .then((url) => {
      console.log(url)
    })
    .catch((error) => {
      console.log(error)
    })
}
