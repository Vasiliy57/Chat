
import { Logo } from '@shared/components'
import classes from './main.module.css'
import { Friends, Header, Messages, Search } from '@/entites/chat'
import { CreateMessage } from '@features/index'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { useEffect } from 'react'
import { getUsers } from '@shared/store/users'

export const Main: React.FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.UsersSlice.users.allUsers)
  const myEmail = useAppSelector(state => state.ProfileReducer.user.email)

  useEffect(() => {
    dispatch(getUsers(myEmail))
  }, [])

  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <Logo />
        <Search />
        <Friends data={users} />

      </div>
      <div className={classes.right}>

        <Header />
        <Messages />
        <CreateMessage />
      </div>
    </div>
  )
}

