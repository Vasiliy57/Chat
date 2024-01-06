import { useAppSelector } from '@shared/hooks'
import { Dialogs, MyUser } from '@/entites/chat'
import { Logo } from '@shared/components'

import classes from './menuDialogs.module.css'

export const MenuDialogs: React.FC = () => {
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )
  const isCurrentDialogUser: boolean = !currentDialogUser

  return (
    <div
      className={classes.menuDialogs}
      style={isCurrentDialogUser ? { display: 'flex' } : {}}
    >
      <Logo />
      <MyUser />
      <Dialogs />
    </div>
  )
}
