import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../storage'

export const saveFile = async (file: Blob, fileId: string) => {
  const storageRef = ref(storage, fileId)
  return await uploadBytes(storageRef, file)
}
