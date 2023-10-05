
import { Logo } from '@shared/components'
import classes from './main.module.css'
import { Dialogs, Header, Messages, Search } from '@/entites/chat'
import { CreateMessage } from '@features/index'
import { useAppSelector } from '@shared/hooks'
import { useEffect, useState } from 'react'
import { ICurrentDialogUser } from './types'
import { getAllUsersFireStore } from '@/firebase/users'

export const Main: React.FC = () => {
  const myEmail = useAppSelector(state => state.ProfileReducer.user.email)
  const [dialogUserList, setDialogUserList] = useState([])
  const [currentDialogUser, setCurrentDialogUser] = useState<ICurrentDialogUser>({ email: null, userName: null })

  useEffect(() => {
    getAllUsersFireStore(myEmail)
      .then((users) => setDialogUserList(users))
  }, [])

  const selectDialog = (email: string | null, userName: string | null) => {
    setCurrentDialogUser({ email, userName })
  }

  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <Logo />
        <Search />
        <Dialogs data={dialogUserList} selectDialog={selectDialog} currentDialogUser={currentDialogUser} />

      </div>
      <div className={classes.right}>

        <Header currentDialogUser={currentDialogUser} />
        <Messages currentDialogUser={currentDialogUser} />
        <CreateMessage currentDialogUser={currentDialogUser} />
      </div>
    </div>
  )
}

