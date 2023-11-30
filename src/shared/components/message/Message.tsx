import img from './user-img.jpg'
import classes from './message.module.css'
import { messageProps } from './type'
import moment from 'moment'
import { FileMessage, ImageMessage, TextMessage } from './components'

export const Message: React.FC<messageProps> = ({
  isMyMessage,
  content,
  date,
  userName,
  smileDetector,
  typeMessage,
  avatar,
  id,
}) => {
  const time = moment(+date * 1000).format('DD.MM.YY HH:mm')
  const classesName = {
    message: isMyMessage ? classes.myMessage : classes.message,
    avatar: isMyMessage ? classes.myAvatar : classes.avatar,
    name: isMyMessage ? classes.myName : classes.name,
    time: isMyMessage ? classes.myTime : classes.time,
    content: isMyMessage ? classes.myContent : classes.content,
  }
  return (
    <div className={classesName.message}>
      <img src={avatar ?? img} className={classesName.avatar} />
      <div className={classesName.name}>
        {userName} <span className={classesName.time}>{time}</span>
      </div>
      <div
        className={
          typeMessage === 'image' || typeMessage === 'file'
            ? `${classesName.content} ${classes.contentFile}`
            : classesName.content
        }
      >
        {typeMessage === 'image' ? (
          <ImageMessage imageId={id!} />
        ) : typeMessage === 'file' ? (
          <FileMessage fileId={id!} content={content} />
        ) : (
          <TextMessage content={content} smileDetector={smileDetector} />
        )}
      </div>
    </div>
  )
}
