import { storage } from '../storage'
import { ref, getDownloadURL } from 'firebase/storage'

export const getFile = async (imageId: string) => {
  getDownloadURL(ref(storage, imageId))
    .then((url) => {
      console.log(url)
    })
    .catch((error) => {
      console.log(error)
    })
}
