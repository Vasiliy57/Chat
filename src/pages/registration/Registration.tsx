import { useState } from 'react'
import classes from './registration.module.css'
import { createNewUserFirebase } from '@/firebase'
import { Link } from 'react-router-dom'
import { Button, FormInput, FormTitle } from '@/shared/ui'
import { IData, IUser } from '../types'
import { setUser } from '@/shared/store/profile'
import { useAppDispatch } from '@shared/hooks'
import { createDialogs, registrationUser } from '@/firebase/users'
import { buttonTypes, classNamesBtn } from '@shared/constants/button'

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
        <FormInput
          placeholder="User Name"
          onChange={handlerUserName}
          value={userName}
        />
        <FormInput
          placeholder="Email"
          onChange={handlerEmail}
          type="email"
          value={email}
        />
        <FormInput
          placeholder="Password"
          onChange={handlerPassword}
          type="password"
          value={password}
        />
        <FormInput
          placeholder="Confirm Password"
          onChange={handlerRepeatPassword}
          type="password"
          value={repeatPassword}
        />
        <Button
          type={buttonTypes.BUTTON}
          content={'Create user'}
          onClick={handlerBtnReg}
          classNameBtn={classNamesBtn.FORM}
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
