
import { Icon } from './Icon'
import classes from './buttonIcon.module.css'

interface IButtonIcon {
  onClick: () => void
  name: 'attach' | 'menu' | 'phone' | 'smile' | 'video' | 'voice'
  style?: React.CSSProperties
}

export const ButtonIcon: React.FC<IButtonIcon> = ({ name, onClick, style }) => {

  const onHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }

  return (
    <button className={classes.button} onClick={onHandler} style={style}>
      <Icon name={name} />
    </button>
  )
}

