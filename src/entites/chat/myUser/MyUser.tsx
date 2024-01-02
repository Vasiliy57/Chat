import { useAppDispatch, useAppSelector } from '@shared/hooks'
import {
  setCurrentDialogId,
  setCurrentDialogUser,
} from '@shared/store/chat/chat'
import { Link } from 'react-router-dom'
import img from '@shared/assets/images/user-img.jpg'
import classes from './style.module.css'

export const MyUser: React.FC = () => {
  const dispatch = useAppDispatch()
  const { userName, avatar } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const onHandlerClick = () => {
    dispatch(setCurrentDialogUser(null))
    dispatch(setCurrentDialogId(null))
  }
  return (
    <Link to="/profile" className={classes.myUser} onClick={onHandlerClick}>
      <div className={classes.img}>
        <img src={avatar || img} alt="avatar" />
      </div>
      <div className={classes.name}>{userName}</div>
    </Link>
  )
}
