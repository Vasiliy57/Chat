// import classes from './style.module.css'
// import { getDownloadURL, ref } from 'firebase/storage'
// import { storage } from '@/firebase/storage'
// import fileImg from './file.png'
// import { useEffect, useState } from 'react'

// interface FileMessageProps {
//   fileId: string
//   content: string
// }

// export const FileMessage: React.FC<FileMessageProps> = ({
//   fileId,
//   content,
// }) => {
//   const [url, setUrl] = useState('')

//   useEffect(() => {
//     getDownloadURL(ref(storage, fileId))
//       .then((url) => {
//         setUrl(url)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   })

//   return (
//     <div className={classes.file}>
//       <a href={url} target="_blank" rel="noopener noreferrer" download="file">
//         <img src={fileImg} alt="file img" />
//       </a>
//       <span className={classes.type}>{content || 'unknown format'}</span>
//     </div>
//   )
// }
import { storage } from '@/firebase/storage'
import { showNotification } from '@shared/utils'
import { getDownloadURL, ref } from 'firebase/storage'

import fileImg from './file.png'
import classes from './style.module.css'

interface FileMessageProps {
  fileId: string
  content: string
}

export const FileMessage: React.FC<FileMessageProps> = ({
  fileId,
  content,
}) => {
  const onHandlerDownload = () => {
    getDownloadURL(ref(storage, fileId))
      .then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        // xhr.onload = () => {
        //   const blob = xhr.response
        // }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch((Error) => {
        showNotification('error', Error.message)
      })
  }

  return (
    <div className={classes.file}>
      <img src={fileImg} alt="file img" onClick={onHandlerDownload} />
      <span className={classes.type}>{content || 'unknown format'}</span>
    </div>
  )
}
