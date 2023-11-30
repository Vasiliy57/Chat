import { storage } from '@/firebase/storage'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

interface ImageMessageProps {
  imageId: string
}

export const ImageMessage: React.FC<ImageMessageProps> = ({ imageId }) => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    getDownloadURL(ref(storage, imageId))
      .then((url) => {
        setUrl(url)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  return (
    <div>
      <img src={url} alt="image" />
    </div>
  )
}
