import { useAppSelector } from '@shared/hooks'
import { Link } from 'react-router-dom'
import img from '@shared/assets/images/user-img.jpg'
import classes from './style.module.css'

export const MyUser: React.FC = () => {
  const { userName, avatar } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  return (
    <Link to="/profile" className={classes.myUser}>
      <div className={classes.img}>
        <img src={avatar || img} alt="avatar" />
      </div>
      <div className={classes.name}>{userName}</div>
    </Link>
  )
}
