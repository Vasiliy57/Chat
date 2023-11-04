import { Icon } from '@shared/assets/Icon/Icon'
import { SvgProps } from '@shared/types/icon'
import { buttonTypes, classNamesBtn } from '@shared/constants/button'
import classes from './style.module.css'

type Keys = keyof typeof classNamesBtn
type values = (typeof classNamesBtn)[Keys]

interface ButtonProps extends SvgProps {
  onClick: () => void
  styleBtn?: React.CSSProperties
  type: keyof typeof buttonTypes
  content?: string
  classNameBtn?: values
}

export const Button: React.FC<ButtonProps> = ({
  iconName,
  onClick,
  styleBtn,
  styleIcon,
  widthIcon,
  heightIcon,
  type,
  content,
  classNameBtn,
}) => {
  const onHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }

  return (
    <button
      className={`${classes.button} ${
        classNameBtn ? classes[classNameBtn] : ''
      }`}
      onClick={onHandler}
      style={styleBtn}
    >
      {type === buttonTypes.BUTTON || type === buttonTypes.BUTTON_ICON
        ? content
        : null}
      {type === buttonTypes.ICON || type === buttonTypes.BUTTON_ICON ? (
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
