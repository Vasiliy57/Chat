import { Link } from 'react-router-dom'
import defaultImg from '@shared/assets/images/user-img.jpg'
import { ISelectedUser } from './types'
import classes from './selectedUser.module.css'
import { Routing } from '@shared/constants'

export const SelectedUser: React.FC<ISelectedUser> = ({
  currentDialogUser,
}) => {
  return (
    <Link
      to={`${Routing.USER_PROFILE_FOR_DYNAMIC_ID}/${currentDialogUser.userId}`}
    >
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
