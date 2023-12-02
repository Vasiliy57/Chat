import { useAppSelector } from '@shared/hooks'

import { Button } from '@shared/ui'
import { Icon } from '@shared/assets/Icon/Icon'

import { BUTTON_CLASS_NAME, BUTTON_TYPE, ICONS } from '@shared/constants'

import { AvatarProps } from './type'
import defaultImg from '@shared/assets/images/user-img.jpg'

import classes from './style.module.css'

export const Avatar: React.FC<AvatarProps> = ({
  isEdit,
  onHandlerInputFile,
  currentImg,
  onHandlerEdit,
}) => {
  const { userName, avatar } = useAppSelector(
    (state) => state.ProfileReducer.user
  )

  const styleBtnEdit = {
    position: 'absolute',
    top: '20px',
    right: '50px',
  } as const

  const styleIconDownload = {
    position: 'absolute',
    top: '-10px',
    right: '-21px',
    color: '#D9D9D9',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  } as const

  if (isEdit) {
    return (
      <div>
        <div className={classes.info}>
          <input
            className={classes.inputFile}
            type="file"
            id="down"
            onChange={(e) => onHandlerInputFile(e)}
          />
          <label htmlFor="down">
            <Icon iconName={ICONS.DOWNLOAD} styleIcon={styleIconDownload} />
          </label>
          <div className={classes.img}>
            <img
              className={classes.avatar}
              src={currentImg ? currentImg : avatar ? avatar : defaultImg}
              alt="avatar"
            />
          </div>
          <div className={classes.name}>{userName}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Button
          styleBtn={styleBtnEdit}
          widthIcon="22px"
          heightIcon="22px"
          onClick={onHandlerEdit}
          buttonType={BUTTON_TYPE.ICON}
          iconName={ICONS.EDIT}
          buttonClassName={BUTTON_CLASS_NAME.ICON}
        />
        <div className={classes.info}>
          <div className={classes.img}>
            <img src={avatar || defaultImg} alt="avatar" />
          </div>
          <div className={classes.name}>{userName}</div>
        </div>
      </div>
    )
  }
}
