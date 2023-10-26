import { Dialog, MenuDialogs } from '@widgets/chat'
import classes from './main.module.css'
import { MyUser } from '@/entites/chat'

export const Chat: React.FC = () => {
  return (
    <div className={classes.main}>
      <MenuDialogs />
      <Dialog />
      <MyUser />
    </div>
  )
}
