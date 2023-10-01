

import img from './user-img.jpg'
import classes from './message.module.css'

interface IMessage {
  img?: string
  name?: string
  time?: string
  text?: string
  myMessage?: boolean
  doubleMessage?: boolean
}

export const Message: React.FC<IMessage> = ({ myMessage }) => {
  return (

    <>{
      myMessage
        ? <div className={classes.MyMessage}>
          <img src={img} className={classes.MyImg} />
          <div className={classes.MyName}>
            <span className={classes.MyTime}>10:30 AM</span> Grace Miller
          </div>
          <div className={classes.MyText}>
            Absolutely! I'm thinking of going for a hike on Saturday. How
            about you?
            Absolutely! I'm thinking of going for a hike on Saturday. How
            about you?
          </div>
        </div>
        : <div className={classes.message}>
          <img src={img} className={classes.img} />
          <div className={classes.name}>
            Grace Miller <span className={classes.time}>10:30 AM</span>
          </div>
          <div className={classes.text}>
            Absolutely! I'm thinking of going for a hike on Saturday. How
            about you?
            Absolutely! I'm thinking of going for a hike on Saturday. How
            about you?
          </div>
        </div>
    }
    </>
  )
}

