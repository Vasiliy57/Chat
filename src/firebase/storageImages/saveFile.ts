import { showNotification } from '@shared/utils'
import { storage } from '../storage'
import { ref, uploadBytes } from 'firebase/storage'

export const saveFile = async (file: Blob, fileId: string) => {
  try {
    const metadata = {
      contentType: file.type,
    }

    const storageRef = ref(storage, fileId)
    return await uploadBytes(storageRef, file, metadata)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showNotification('error', error.message)
  }
}
