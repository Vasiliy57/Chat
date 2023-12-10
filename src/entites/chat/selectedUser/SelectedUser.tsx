import { Link } from 'react-router-dom'
import defaultImg from '@shared/assets/images/user-img.jpg'
import { Routing } from '@shared/constants'
import { ISelectedUser } from './types'
import classes from './selectedUser.module.css'

export const SelectedUser: React.FC<ISelectedUser> = ({
  currentDialogUser,
}) => {
  return (
    <Link to={Routing.USER_PROFILE}>
      <div className={classes.selectedUser}>
        <img
          className={classes.img}
          src={currentDialogUser.avatar || defaultImg}
          alt="User icon"
        />
        <div className={classes.info}>
          <div className={classes.name}>{currentDialogUser.userName} </div>
          <div className={classes.status}>Online</div>
        </div>
      </div>
    </Link>
  )
}
