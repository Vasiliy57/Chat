
import { User } from '../user/User'
import classes from './dialogs.module.css'
import { IFriendsProps } from './types'

export const Dialogs: React.FC<IFriendsProps> = ({ data, onSelectDialog, currentDialogUser }) => {

  return (
    <div className={classes.friends}>
      <div className={classes.title}>PINNED CHATS</div>
      {data.map((user, index) => {
        return <User
          key={index}
          userName={user.userName}
          email={user.email}
          userId={user.userId}
          isSelected={user.email === currentDialogUser?.email}
          onSelectDialog={onSelectDialog} />
      })}
    </div>
  )
}

