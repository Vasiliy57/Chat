import { useAppDispatch } from '@shared/hooks'
import { useEffect, useState } from 'react'
import { getUser } from '@/firebase/users'
import defaultImg from '@shared/assets/images/user-img.jpg'
import classes from './style.module.css'
import { Icon } from '@shared/assets/Icon/Icon'
import { ICONS, Routing } from '@shared/constants'
import { Link, useParams } from 'react-router-dom'
import {
  setCurrentDialogId,
  setCurrentDialogUser,
} from '@shared/store/chat/chat'

interface IUser {
  email: string | null
  userName: string | null
  userId: string
  avatar: string | null
  infoAboutMe: string | null
  number: string | null
  address: string | null
  emailVerified: boolean
}
type IParams = {
  id: string
}

export const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<IParams>()

  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    getUser(id!).then((data) => setUser(data))
  }, [])
  const onHandlerBtn = () => {
    dispatch(setCurrentDialogUser(null))
    dispatch(setCurrentDialogId(null))
  }

  if (user) {
    return (
      <div className={classes.profile}> 
        <Link
          to={Routing.CHAT}
          className={classes.btnBack}
          onClick={onHandlerBtn}
        >
          <Icon iconName={ICONS.BACK} />
        </Link>
        <div className={classes.avatar}>
          <img src={user?.avatar ?? defaultImg} alt="avatar" />
        </div>
        <div className={classes.name}>{user.userName}</div>
        <div className={classes.info}>
          <div className={classes.title}>Info about {user.userName}</div>
          <div className={classes.infoText}>
            {user.infoAboutMe ||
              'The user did not write anything about himself'}
          </div>
        </div>
        <div className={classes.contacts}>
          <div className={classes.title}>Contacts</div>
          <ul className={classes.row}>
            <li>
              <span className={classes.contactsIcon}>
                <Icon iconName={ICONS.TEL} />
              </span>
              {user.number || 'unknown'}
            </li>
            <li>
              <span className={classes.contactsIcon}>
                <Icon iconName={ICONS.EMAIL} />
              </span>
              {user.email}
            </li>
            <li>
              <span className={classes.contactsIcon}>
                <Icon iconName={ICONS.LOCATION} />
              </span>
              {user.address || 'unknown'}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
