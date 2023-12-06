import { useEffect, useState } from 'react'
import { useAppSelector, useCustomSearch } from '@shared/hooks'

import { Input } from '@/shared/ui'
import { Icon } from '@shared/assets/Icon/Icon'

import { ICONS } from '@shared/constants'
import { INPUT_CLASS_NAME } from '@shared/constants'
import { IUser } from '@pages/types'

import classes from './search.module.css'

interface SearchProps {
  setSearchDialogUserList: (users: IUser[]) => void
}

export const Search: React.FC<SearchProps> = ({ setSearchDialogUserList }) => {
  const myUserId = useAppSelector((state) => state.ProfileReducer.user.userId)
  const [value, setValue] = useState<string>('')
  const foundUsers = useCustomSearch(myUserId, value)

  useEffect(() => {
    setSearchDialogUserList(foundUsers)
    return () => setSearchDialogUserList([])
  }, [foundUsers])

  // const [allUsers, setAllUsers] = useState<IUser[]>([])
  // const delayedValue = useDebounce(value, 1000)

  // useEffect(() => {
  //   getAllUsers(myUserId)
  //     .then((users) => setAllUsers(users))
  //     .catch((error) => showNotification('error', error.message))
  //   console.log('Get all users')
  // }, [])
  // useEffect(() => {
  //   const foundUsers = userSearch(delayedValue, allUsers)
  //   setSearchDialogUserList(foundUsers)
  //   return () => {
  //     setSearchDialogUserList([])
  //   }
  // }, [delayedValue, allUsers])

  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const styleIcon = {
    position: 'absolute',
    left: '39px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18.3px',
    height: ' 18.3px',
    Zindex: '10',
  } as const

  return (
    <div className={classes.search}>
      <Icon iconName={ICONS.SEARCH} styleIcon={styleIcon} />
      <Input
        onChange={onHandlerInput}
        inputClassName={INPUT_CLASS_NAME.SEARCH}
        placeholder="Search people"
      />
    </div>
  )
}
