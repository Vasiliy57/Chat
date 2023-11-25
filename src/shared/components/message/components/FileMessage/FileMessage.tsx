import classes from './style.module.css'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/firebase/storage'
import fileImg from './file.png'

interface FileMessageProps {
  fileId: string
}
export const FileMessage: React.FC<FileMessageProps> = ({ fileId }) => {
  const onHandlerDownload = () => {
    getDownloadURL(ref(storage, fileId))
      .then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = (event) => {
          const blob = xhr.response
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={classes.file} onClick={onHandlerDownload}>
      <img src={fileImg} alt="file img" />
    </div>
  )
}
