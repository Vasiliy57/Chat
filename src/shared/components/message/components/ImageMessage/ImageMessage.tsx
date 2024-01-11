import { useEffect, useState } from 'react'
import { showNotification } from '@shared/utils'
import { storage } from '@/firebase/storage'
import { getDownloadURL, ref } from 'firebase/storage'
interface ImageMessageProps {
  imageId: string
}
import classes from './style.module.css'

export const ImageMessage: React.FC<ImageMessageProps> = ({ imageId }) => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    getDownloadURL(ref(storage, imageId))
      .then((url) => {
        setUrl(url)
      })
      .catch((Error) => {
        showNotification('error', Error.message)
      })
  }, [imageId])

  return (
    <div className={classes.image}>
      <img src={url} alt="image" />
    </div>
  )
}
