
import { useAppSelector } from '@shared/hooks'
import { SelectedUser } from '../selectedUser/SelectedUser'
import classes from './header.module.css'
import { ButtonIcon } from '@/shared/ui'

export const Header: React.FC = () => {
  const currentDialogUser = useAppSelector(state => state.chatSlice.currentDialogUser)
  return (
    <div className={classes.header}>
      {
        currentDialogUser?.email
          ?
          <>
            <SelectedUser currentDialogUser={currentDialogUser} />
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

