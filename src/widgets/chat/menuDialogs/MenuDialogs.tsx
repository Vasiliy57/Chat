import { Dialogs } from '@/entites/chat'
import { Logo } from '@shared/components'

import classes from './menuDialogs.module.css'
export const MenuDialogs: React.FC = () => {
  return (
    <div className={classes.menuDialogs}>
      <Logo />
      <Dialogs />
    </div>
  )
}
