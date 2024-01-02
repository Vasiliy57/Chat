import { storage } from '../storage'
import { ref, uploadString } from 'firebase/storage'

export const saveImage = (imgUrl: string, userId: string) => {
  const storageRef = ref(storage, userId)
  uploadString(storageRef, imgUrl, 'data_url').then(() => {
    console.log('Uploaded a data_url string!')
  })
}
