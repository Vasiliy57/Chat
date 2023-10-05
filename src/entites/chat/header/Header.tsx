
import { SelectedUser } from '../selectedUser/SelectedUser'
import classes from './header.module.css'
import { ButtonIcon } from '@/shared/ui'
import { IHeader } from './types'

export const Header: React.FC<IHeader> = ({ currentDialogUser }) => {
  const currentUser = currentDialogUser.email || null
  return (
    <div className={classes.header}>
      {
        currentUser
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

