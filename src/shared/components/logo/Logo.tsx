import { Icon } from '@shared/assets/Icon/Icon'
import { ICONS } from '@shared/constants'
import classes from './style.module.css'

export const Logo: React.FC = () => {
  return (
    <div className={classes.logo}>
      <Icon iconName={ICONS.LOGO} heightIcon="30px" widthIcon="33px" />
      <div className={classes.name}>Chat Buddies</div>
    </div>
  )
}
