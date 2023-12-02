import { ISelectedUser } from './types'
import defaultImg from '@shared/assets/images/user-img.jpg'
import classes from './selectedUser.module.css'

export const SelectedUser: React.FC<ISelectedUser> = ({
  currentDialogUser,
}) => {
  return (
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
  )
}
