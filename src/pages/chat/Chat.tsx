import { Dialog, MenuDialogs } from '@widgets/chat'
import { MyUser } from '@/entites/chat'
import classes from './main.module.css'

export const Chat: React.FC = () => {
  return (
    <div className={classes.wrap}>
      <div className={classes.main}>
        <MenuDialogs />
        <Dialog />
        <MyUser />
      </div>
    </div>
  )
}
