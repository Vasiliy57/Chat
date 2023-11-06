import { useAppSelector } from '@shared/hooks'
import classes from './style.module.css'
import img from './user-img.jpg'
import { Link } from 'react-router-dom'
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
