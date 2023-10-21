import userImg from './user-img.jpg'
import classes from './selectedUser.module.css'
import { ISelectedUser } from './types'
export const SelectedUser: React.FC<ISelectedUser> = ({currentDialogUser}) => {
    return (
        <div className={classes.selectedUser}>
            <img className={classes.img} src={userImg} alt="User icon" />
            <div className={classes.info}>
                <div className={classes.name}>
                    {currentDialogUser.userName}{' '}
                </div>
                <div className={classes.status}>Online</div>
            </div>
        </div>
    )
}
