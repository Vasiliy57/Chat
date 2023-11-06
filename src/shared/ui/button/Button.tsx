import { Icon } from '@shared/assets/Icon/Icon'
import { BUTTON_TYPE } from '@shared/constants'
import classes from './style.module.css'
import { ButtonProps } from './type'

export const Button: React.FC<ButtonProps> = ({
  iconName,
  onClick,
  styleBtn,
  styleIcon,
  widthIcon,
  heightIcon,
  buttonType,
  content,
  buttonClassName = '',
  ...props
}) => {
  const onHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      {...props}
      className={`${classes.button} ${
        buttonClassName ? classes[buttonClassName] : ''
      }`}
      onClick={onHandler}
      style={styleBtn}
    >
      {buttonType === BUTTON_TYPE.BUTTON ||
      buttonType === BUTTON_TYPE.BUTTON_ICON
        ? content
        : null}
      {buttonType === BUTTON_TYPE.ICON ||
      buttonType === BUTTON_TYPE.BUTTON_ICON ? (
        <Icon
          iconName={iconName}
          styleIcon={styleIcon}
          widthIcon={widthIcon}
          heightIcon={heightIcon}
        />
      ) : null}
    </button>
  )
}
