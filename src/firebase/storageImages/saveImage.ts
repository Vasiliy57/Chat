import { ref, uploadString } from 'firebase/storage'
import { storage } from '../storage'

export const savaImage = (imgUrl: string, userId: string) => {
  const storageRef = ref(storage, userId)
  uploadString(storageRef, imgUrl, 'data_url').then(() => {
    console.log('Uploaded a data_url string!')
  })
}
