import { Dialogs, Search } from '@/entites/chat'
import { Logo } from '@shared/components'
import { useState } from 'react'

import classes from './menuDialogs.module.css'
import {
  setCurrentDialogId,
  setCurrentDialogUser,
} from '@shared/store/chat/chat'
import { useAppDispatch } from '@shared/hooks'

export const MenuDialogs: React.FC = () => {
  const [isMyDialogs, setIsMyDialogs] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const onSwitchDialogs = (dialogs: boolean) => {
    setIsMyDialogs(dialogs)
    dispatch(setCurrentDialogUser(null))
    dispatch(setCurrentDialogId(null))
  }

  return (
    <div className={classes.menuDialogs}>
      <Logo />
      {!isMyDialogs && <Search />}
      <Dialogs isMyDialogs={isMyDialogs} onSwitchDialogs={onSwitchDialogs} />
    </div>
  )
}
