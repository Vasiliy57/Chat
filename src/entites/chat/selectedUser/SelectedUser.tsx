import { Link } from 'react-router-dom'
import { ISelectedUser } from './types'
import { Routing } from '@shared/constants'
import defaultImg from '@shared/assets/images/user-img.jpg'
import classes from './style.module.css'

export const SelectedUser: React.FC<ISelectedUser> = ({
  currentDialogUser,
}) => {
  return (
    <Link
      className={classes.selectedUser}
      to={`${Routing.USER_PROFILE_FOR_DYNAMIC_ID}/${currentDialogUser.userId}`}
    >
      <img
        className={classes.img}
        src={currentDialogUser.avatar || defaultImg}
        alt="User icon"
      />
      <div className={classes.info}>
        <div className={classes.name}>{currentDialogUser.userName} </div>
        <div className={classes.status}>Online</div>
      </div>
    </Link>
  )
}
