import img from './user-img.jpg'
import classes from './message.module.css'
import { messageProps } from './type'
import moment from 'moment'
import { HandlerEmojiContent } from '@shared/utils'

export const Message: React.FC<messageProps> = ({
  isMyMessage,
  content,
  date,
  userName,
  smileDetector,
}) => {
  const time = moment(+date * 1000).format('DD.MM.YY HH:mm')
  return (
    <>
      {!isMyMessage ? (
        <div className={classes.message}>
          <img src={img} className={classes.img} />
          <div className={classes.name}>
            {userName} <span className={classes.time}>{time}</span>
          </div>
          <div className={classes.text}>
            <HandlerEmojiContent
              content={content}
              smileDetector={smileDetector}
              sizeSmile={23}
            />
          </div>
        </div>
      ) : (
        <div className={classes.myMessage}>
          <img src={img} className={classes.myImg} />
          <div className={classes.myName}>
            {userName} <span className={classes.myTime}>{time}</span>
          </div>
          <div className={classes.myText}>
            <HandlerEmojiContent
              content={content}
              smileDetector={smileDetector}
              sizeSmile={25}
            />
          </div>
        </div>
      )}
    </>
  )
}
