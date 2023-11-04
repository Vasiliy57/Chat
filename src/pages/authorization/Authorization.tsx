import { Button, FormInput, FormTitle } from '@/shared/ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './authorization.module.css'
import { signInUserFirebase } from '@/firebase'
import { setUser } from '@/shared/store/profile'
import { useAppDispatch } from '@shared/hooks'
import { getUser } from '@/firebase/users'
import { buttonTypes, classNamesBtn } from '@shared/constants/button'

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

  const handlerBtnLogin = async () => {
    try {
      const userData = await signInUserFirebase(email, password)
      const data = await getUser(userData.user.uid)
      if (data) {
        dispatch(
          setUser({
            email: userData.user.email,
            emailVerified: userData.user.emailVerified,
            userId: userData.user.uid,
            userName: data.userName,
            avatar: data.avatar,
            infoAboutMe: data.infoAboutMe,
            number: data.number,
            address: data.address,
          })
        )
      }
    } catch (err) {
      console.log(err)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className={classes.authorization}>
      <form className={classes.form}>
        <FormTitle title="Authorization" />
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
        <Button
          type={buttonTypes.BUTTON}
          content={'Log in'}
          onClick={handlerBtnLogin}
          classNameBtn={classNamesBtn.FORM}
        />

        <div className={classes.text}>
          DON’T HAVE AN ACCOUNT ?<span> </span>
          <Link className={classes.link} to="/registration">
            CREATE ONE{' '}
          </Link>
        </div>
      </form>
    </div>
  )
}
