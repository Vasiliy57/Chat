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
import classes from './style.module.css'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/firebase/storage'
import fileImg from './file.png'

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
        console.log(url)

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
    <div className={classes.file}>
      <img src={fileImg} alt="file img" onClick={onHandlerDownload} />
      <span className={classes.type}>{content || 'unknown format'}</span>
    </div>
  )
}
//https://firebasestorage.googleapis.com/v0/b/messenger-7a8c6.appspot.com
