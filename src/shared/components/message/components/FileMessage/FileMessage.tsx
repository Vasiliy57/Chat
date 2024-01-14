import { storage } from '@/firebase/storage'
import { showNotification } from '@shared/utils'
import { getDownloadURL, ref } from 'firebase/storage'

import fileImg from './file.png'
import classes from './style.module.css'
import { useEffect, useState } from 'react'

interface FileMessageProps {
  fileId: string
  content: string
}

export const FileMessage: React.FC<FileMessageProps> = ({
  fileId,
  content,
}) => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    getDownloadURL(ref(storage, fileId))
      .then((url) => {
        setUrl(url)
      })
      .catch((Error) => {
        showNotification('error', Error.message)
      })
  }, [])

  return (
    <div className={classes.file}>
      <a href={url} target="blank">
        <img src={fileImg} alt="file img" />
      </a>

      <span className={classes.type}>{content || 'unknown format'}</span>
    </div>
  )
}
