
import { selectUser } from '@shared/store/profile/profileSlice'
import { User } from '../user/User'
import classes from './friends.module.css'
import { IFriendsProps } from './types'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

export const Friends: React.FC<IFriendsProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const selectedUser = useAppSelector((state) => state.ProfileReducer.selectedUser)

  const onSelectUser = (email?: string, name?: string) => {
    const userName = name
    dispatch(selectUser({ email, userName }))
  }

  return (
    <div className={classes.friends}>
      <div className={classes.title}>PINNED CHATS</div>
      {data.map((user, index) => {
        return <User
          key={index}
          name={user.userName}
          email={user.email}
          selectedUserEmail={selectedUser?.email}
          onSelectUser={onSelectUser} />
      })}
    </div>
  )
}

