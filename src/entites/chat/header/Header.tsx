import { useAppSelector } from '@shared/hooks'
import { SelectedUser } from '../selectedUser/SelectedUser'
import classes from './header.module.css'
import { Button } from '@/shared/ui'
import { icons } from '@shared/constants/icons'
import { buttonTypes } from '@shared/constants/button'

export const Header: React.FC = () => {
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  return (
    <div className={classes.header}>
      {currentDialogUser?.email ? (
        <>
          <SelectedUser currentDialogUser={currentDialogUser} />
          <div className={classes.row}>
            <Button
              onClick={() => {}}
              type={buttonTypes.ICON}
              iconName={icons.PHONE}
            />
            <Button
              onClick={() => {}}
              type={buttonTypes.ICON}
              iconName={icons.VIDEO}
            />
            <Button
              onClick={() => {}}
              type={buttonTypes.ICON}
              iconName={icons.MENU}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
