
import { UserProps } from './types'
import userImg from './user-img.jpg'
import classes from './user.module.css'


export const User: React.FC<UserProps> = ({ userName, email, img, onSelectDialog, userId, isSelected }) => {
  const currentClassName = isSelected ? 'user-select' : 'user'
  const onHandlerClick = () => {
    onSelectDialog(email, userName, userId)
  }
  return (
    <div className={classes[currentClassName]} onClick={onHandlerClick}>
      {
        img
          ? <img className={classes.img} src={img} alt="User avatar" />
          : <img className={classes.img} src={userImg} alt="User icon" />
      }


      <div className={classes.info}>

        <div className={classes.row}>
          <div className={classes.name}>{userName}</div>
          <div className={classes.lastMessage}>Hey, how's it going?</div>
        </div>

        <div className={classes.right}>
          <div className={classes.time}>10:30 AM</div>
          <div className={classes.count}> 3 </div>
        </div>

      </div>
    </div>
  )
}

