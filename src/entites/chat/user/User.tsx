
import { IUser } from './types'
import userImg from './user-img.jpg'
import classes from './user.module.css'


export const User: React.FC<IUser> = ({ name, email, img, selectedUserEmail, onSelectUser }) => {
  const currentClassName = selectedUserEmail === email ? 'user-select' : 'user'
  const onHandlerClick = () => {
    onSelectUser(email, name)
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
          <div className={classes.name}>{name}</div>
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

