import { useState } from 'react'
import { useAppDispatch } from '@shared/hooks'

import { Dialogs, Search } from '@/entites/chat'
import { Logo } from '@shared/components'

import {
  setCurrentDialogId,
  setCurrentDialogUser,
} from '@shared/store/chat/chat'
import { IUser } from '@pages/types'

import classes from './menuDialogs.module.css'

export const MenuDialogs: React.FC = () => {
  const [isMyDialogs, setIsMyDialogs] = useState<boolean>(true)
  const [searchDialogUserList, setSearchDialogUserList] = useState<IUser[]>([])
  const dispatch = useAppDispatch()

  const onSwitchDialogs = (dialogs: boolean) => {
    setIsMyDialogs(dialogs)
    dispatch(setCurrentDialogUser(null))
    dispatch(setCurrentDialogId(null))
  }

  return (
    <div className={classes.menuDialogs}>
      <Logo />
      {!isMyDialogs && (
        <Search setSearchDialogUserList={setSearchDialogUserList} />
      )}
      <Dialogs
        isMyDialogs={isMyDialogs}
        onSwitchDialogs={onSwitchDialogs}
        searchDialogUserList={searchDialogUserList}
      />
    </div>
  )
}
