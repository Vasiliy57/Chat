import img from './user-img.jpg'
import classes from './message.module.css'
import { messageProps } from './type'


export const Message: React.FC<messageProps> = ({ isMyMessage, content, date, typeMessage, userName }) => {
  return (
    <>
      {
        !isMyMessage
          ?
          <div className={classes.message} >
            <img src={img} className={classes.img} />
            <div className={classes.name}>
              {userName} <span className={classes.time}>{date}</span>
            </div>
            <div className={classes.text}>
              {content}
            </div>
          </div >
          :
          <div className={classes.myMessage} >
            <img src={img} className={classes.myImg} />
            <div className={classes.myName}>
              {userName} <span className={classes.myTime}>{date}</span>
            </div>
            <div className={classes.myText}>
              {content}
            </div>
          </div >
      }
    </>
  )
}

