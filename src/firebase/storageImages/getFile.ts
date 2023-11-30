import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../storage'

export const getFile = async (imageId: string) => {
  getDownloadURL(ref(storage, imageId))
    .then((url) => {
      console.log(url)
    })
    .catch((error) => {
      console.log(error)
    })
}
