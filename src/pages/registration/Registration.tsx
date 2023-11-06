import { useState } from 'react'
import classes from './registration.module.css'
import { createNewUserFirebase } from '@/firebase'
import { Link } from 'react-router-dom'
import { Button, FormTitle, Input } from '@/shared/ui'
import { IData, IUser } from '../types'
import { setUser } from '@/shared/store/profile'
import { useAppDispatch } from '@shared/hooks'
import { createDialogs, registrationUser } from '@/firebase/users'
import {
  BUTTON_TYPE,
  BUTTON_CLASS_NAME,
  INPUT_CLASS_NAME,
} from '@shared/constants'

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const handlerUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handlerRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value)
  }
  const handlerBtnReg = () => {
    if (password === repeatPassword) {
      createNewUserFirebase(email, password)
        .then((data: IData): IUser => data.user)
        .then(async (user: IUser) => {
          await registrationUser(email, userName, user.uid, user.emailVerified)
          await createDialogs(user.uid)
          dispatch(
            setUser({
              email: user.email,
              emailVerified: user.emailVerified,
              userName,
              userId: user.uid,
              avatar: null,
              infoAboutMe: null,
              number: null,
              address: null,
            })
          )
        })
        .catch((err) => {
          console.log(err.message)
        })

      setEmail('')
      setPassword('')
      setRepeatPassword('')
      setUserName('')
    } else {
      alert("Passwords don't match !!!")
    }
  }

  return (
    <div className={classes.registration}>
      <form className={classes.form}>
        <FormTitle title="Registration" />

        <Input
          inputClassName={INPUT_CLASS_NAME.FORM}
          placeholder="User Name"
          onChange={handlerUserName}
          value={userName}
        />
        <Input
          inputClassName={INPUT_CLASS_NAME.FORM}
          placeholder="Email"
          onChange={handlerEmail}
          type="email"
          value={email}
        />
        <Input
          inputClassName={INPUT_CLASS_NAME.FORM}
          placeholder="Password"
          onChange={handlerPassword}
          type="password"
          value={password}
        />
        <Input
          inputClassName={INPUT_CLASS_NAME.FORM}
          placeholder="Confirm Password"
          onChange={handlerRepeatPassword}
          type="password"
          value={repeatPassword}
        />

        <Button
          buttonType={BUTTON_TYPE.BUTTON}
          content={'Create user'}
          onClick={handlerBtnReg}
          buttonClassName={BUTTON_CLASS_NAME.FORM}
        />
        <div className={classes.text}>
          ALREADY HAVE AN ACCOUNT ?<span> </span>
          <Link className={classes.link} to="/authorization">
            LOGIN
          </Link>
        </div>
      </form>
    </div>
  )
}
