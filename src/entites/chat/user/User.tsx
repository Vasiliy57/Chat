import { useAppDispatch } from '@shared/hooks'
import { UserProps } from './types'
import userImg from './user-img.jpg'
import classes from './user.module.css'
import { setCurrentDialogUser } from '@shared/store/chat/chat'

export const User: React.FC<UserProps> = ({
  userName,
  email,
  img,
  userId,
  isSelected,
}) => {
  const dispatch = useAppDispatch()
  const currentClassName = isSelected ? 'user-select' : 'user'
  const onHandlerClick = () => {
    dispatch(setCurrentDialogUser({ email, userName, userId }))
  }
  return (
    <div className={classes[currentClassName]} onClick={onHandlerClick}>
      <img className={classes.img} src={img ?? userImg} alt="User avatar" />
      <div className={classes.info}>
        <div className={classes.row}>
          <div className={classes.name}>{userName}</div>
          <div className={classes.lastMessage}>Hey, it going?</div>
        </div>
        <div className={classes.right}>
          <div className={classes.time}>10:30 AM</div>
          <div className={classes.count}> 3 </div>
        </div>
      </div>
    </div>
  )
}
