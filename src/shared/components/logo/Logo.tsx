
import classes from './logo.module.css'
import icon from './logo-icon.svg'
export const Logo: React.FC = () => {
  return (
    <div className={classes.logo}>
      <img className={classes.icon} src={icon} alt="logotype" />
      <div className={classes.name}>Chat Buddies</div>
    </div>
  )
}

