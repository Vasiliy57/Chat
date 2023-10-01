
import { useAppSelector } from '@shared/hooks'
import { SelectedUser } from '../selectedUser/SelectedUser'
import classes from './header.module.css'
import { ButtonIcon } from '@/shared/ui'
export const Header: React.FC = () => {
  const selectedUserEmail = useAppSelector(state => state.ProfileReducer.selectedUser.email)
  return (
    <div className={classes.header}>
      {
        selectedUserEmail
          ?
          <>
            <SelectedUser />
            <div className={classes.row}>
              <ButtonIcon name='phone' onClick={() => { }} />
              <ButtonIcon name='video' onClick={() => { }} />
              <ButtonIcon name='menu' onClick={() => { }} />
            </div>
          </>
          : null
      }

    </div>
  )
}

