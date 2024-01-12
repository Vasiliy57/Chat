import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { SelectedUser } from '../selectedUser/SelectedUser'
import { Button } from '@/shared/ui'
import {
  setCurrentDialogId,
  setCurrentDialogUser,
} from '@shared/store/chat/chat'
import { ICONS } from '@shared/constants'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'

import classes from './style.module.css'

export const Header: React.FC = () => {
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  const dispatch = useAppDispatch()
  const onHandlerBack = () => {
    dispatch(setCurrentDialogUser(null))
    dispatch(setCurrentDialogId(null))
  }
  return (
    <div className={classes.header}>
      {currentDialogUser?.email ? (
        <>
          <div className={classes.btnBack}>
            <Button
              onClick={onHandlerBack}
              widthIcon="24px"
              heightIcon="24px"
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.BACK}
              buttonClassName={BUTTON_CLASS_NAME.ICON}
            />
          </div>
          <SelectedUser currentDialogUser={currentDialogUser} />
          <div className={classes.row}>
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.PHONE}
              buttonClassName={BUTTON_CLASS_NAME.PHONE}
            />
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.VIDEO}
              buttonClassName={BUTTON_CLASS_NAME.VIDEO}
            />
            <Button
              onClick={() => {}}
              buttonType={BUTTON_TYPE.ICON}
              iconName={ICONS.MENU}
              buttonClassName={BUTTON_CLASS_NAME.MENU}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
