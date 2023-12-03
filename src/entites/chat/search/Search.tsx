import { useEffect, useState } from 'react'
import { useAppSelector, useDebounce } from '@shared/hooks'

import { Input } from '@/shared/ui'
import { Icon } from '@shared/assets/Icon/Icon'

import { getUsersBySearch } from '@/firebase/users'

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
  const delayedValue = useDebounce(value, 1500)

  useEffect(() => {
    getUsersBySearch(delayedValue.trim(), myUserId).then((users) => {
      setSearchDialogUserList(users)
      return
    })
  }, [delayedValue])

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
        placeholder="Search messages, people"
      />
    </div>
  )
}
