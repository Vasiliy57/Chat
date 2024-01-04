import { useAppSelector } from '@shared/hooks'
import { SelectedUser } from '../selectedUser/SelectedUser'
import { MyUser } from '..'
// import { Button } from '@/shared/ui'

// import { ICONS } from '@shared/constants'
// import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'

import classes from './header.module.css'

export const Header: React.FC = () => {
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  return (
    <div className={classes.header}>
      {currentDialogUser?.email ? (
        <>
          <SelectedUser currentDialogUser={currentDialogUser} />
          {/* <div className={classes.row}>
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.PHONE}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
            />
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.VIDEO}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
            />
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.MENU}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
            />
          </div> */}
        </>
      ) : null}
      <div className={classes.myUser}>
        <MyUser />
      </div>
    </div>
  )
}
