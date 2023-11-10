import img from './user-img.jpg'
import classes from './message.module.css'
import { messageProps } from './type'
import moment from 'moment'

export const Message: React.FC<messageProps> = ({
  isMyMessage,
  content,
  date,
  userName,
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
          <div className={classes.text}>{content}</div>
        </div>
      ) : (
        <div className={classes.myMessage}>
          <img src={img} className={classes.myImg} />
          <div className={classes.myName}>
            {userName} <span className={classes.myTime}>{time}</span>
          </div>
          <div className={classes.myText}>{content}</div>
        </div>
      )}
    </>
  )
}
