

import userImg from './user-img.jpg'
import classes from './selectedUser.module.css'
import { useAppSelector } from '@shared/hooks'
export const SelectedUser: React.FC = () => {
  const selectedUser = useAppSelector((state) => state.ProfileReducer.selectedUser)
  return (
    <div className={classes.selectedUser}>
      <img className={classes.img} src={userImg} alt="User icon" />

      <div className={classes.info}>

        <div className={classes.name}>{selectedUser.userName} </div>
        <div className={classes.status}>Online</div>

      </div>
    </div>
  )
}

