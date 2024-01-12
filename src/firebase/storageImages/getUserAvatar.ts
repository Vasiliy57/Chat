import { showNotification } from '@shared/utils'
import { storage } from '../storage'
import { ref, getDownloadURL } from 'firebase/storage'

export const getUserAvatar = (userId: string) => {
  getDownloadURL(ref(storage, userId))
    .then((url) => {
      console.log(url)
    })
    .catch((Error) => {
      showNotification('error', Error.message)
    })
}
