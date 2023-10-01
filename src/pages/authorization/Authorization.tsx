import { Button, FormInput, FormTitle } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './authorization.module.css'
import { IData, IStateProfile, IUser } from '../types'
import { signInUserFirebase } from '@/firebase'
import { setUser } from '@/shared/store/profile'
import { getUser } from '@/firebase/fireStore'
import { useAppDispatch } from '@shared/hooks'
import { getUsers } from '@shared/store/users'

export const Authorization: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()

  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handlerBtnLogin = () => {
    signInUserFirebase(email, password)
      .then((data: IData): IUser => data.user)
      .then(({ emailVerified }: IUser): void => {
        dispatch(setUser({ emailVerified }))
      })
      .then(() => getUser(email))
      .then((user) => dispatch(setUser({ ...user })))
      .then(() => dispatch(getUsers(email)))
      .catch((err) => {
        console.log(err.message)
      })
    setEmail('')
    setPassword('')
  }

  return (
    <div className={classes.authorization}>
      <form className={classes.form}>
        <FormTitle title='Authorization' />
        <FormInput placeholder='Email' onChange={handlerEmail} type='email' value={email} />
        <FormInput placeholder='Password' onChange={handlerPassword} type='password' value={password} />
        <Button name='LOG IN' onClick={handlerBtnLogin} />
        <div className={classes.text}>
          DON’T HAVE AN ACCOUNT ?<span> </span>
          <Link className={classes.link} to='/registration'>CREATE ONE </Link>
        </div>
      </form>
    </div>
  )
}

