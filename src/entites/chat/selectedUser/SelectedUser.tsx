import { Link } from 'react-router-dom'
import { ISelectedUser } from './types'
import { Button } from '@/shared/ui'

import defaultImg from '@shared/assets/images/user-img.jpg'
import { ICONS } from '@shared/constants'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { Routing } from '@shared/constants'

import classes from './selectedUser.module.css'

export const SelectedUser: React.FC<ISelectedUser> = ({
  currentDialogUser,
}) => {
  return (
    <div className={classes.row}>
      <Link
        to={`${Routing.USER_PROFILE_FOR_DYNAMIC_ID}/${currentDialogUser.userId}`}
      >
        <div className={classes.selectedUser}>
          <img
            className={classes.img}
            src={currentDialogUser.avatar || defaultImg}
            alt="User icon"
          />
          <div className={classes.info}>
            <div className={classes.name}>{currentDialogUser.userName} </div>
            <div className={classes.status}>Online</div>
          </div>
        </div>
      </Link>
      {/* <div className={classes.btnGroup}> */}
      <Button
        onClick={() => {}}
        buttonType={BUTTON_TYPE.ICON}
        iconName={ICONS.PHONE}
        buttonClassName={BUTTON_CLASS_NAME.PHONE}
      />
      {/* <Button
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
        /> */}
      {/* </div> */}
    </div>
  )
}
