import { Icon } from '@shared/assets/Icon/Icon'
import { icons } from '@shared/constants/icons'
import classes from './logo.module.css'

export const Logo: React.FC = () => {
  return (
    <div className={classes.logo}>
      <Icon iconName={icons.LOGO} heightIcon="30px" widthIcon="33px" />
      <div className={classes.name}>Chat Buddies</div>
    </div>
  )
}
