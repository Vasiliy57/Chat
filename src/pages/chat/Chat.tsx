import { Dialog, MenuDialogs } from '@widgets/chat'
import classes from './style.module.css'

export const Chat: React.FC = () => {
  return (
    <div className={classes.wrap}>
      <div className={classes.main}>
        <MenuDialogs />
        <Dialog />
  
      </div>
    </div>
  )
}
