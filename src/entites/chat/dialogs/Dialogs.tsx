import { useState } from 'react'
import {
  useAppDispatch,
  useAppSelector,
  useCustomMyDialogs,
} from '@shared/hooks'

import { Search } from '..'
import { Loader } from '@shared/components/Loader/Loader'
import { User } from '../user/User'
import { Button } from '@shared/ui'

import {
  setCurrentDialogId,
  setCurrentDialogUser,
} from '@shared/store/chat/chat'
import { BUTTON_CLASS_NAME, BUTTON_TYPE } from '@shared/constants'
import { IUser } from '@shared/types/IUser'

import classes from './style.module.css'

export const Dialogs: React.FC = () => {
  const dispatch = useAppDispatch()

  const { email: myEmail } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const currentDialogUser = useAppSelector(
    (state) => state.chatSlice.currentDialogUser
  )

  const [isMyDialogs, setIsMyDialogs] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dialogUserList = useCustomMyDialogs(isMyDialogs, setIsLoading)
  const [searchDialogUserList, setSearchDialogUserList] = useState<IUser[]>([])
  const userList = isMyDialogs ? dialogUserList : searchDialogUserList

  const onSwitchDialogs = (isDialogs: boolean) => {
    setIsMyDialogs(isDialogs)
    dispatch(setCurrentDialogUser(null))
    dispatch(setCurrentDialogId(null))
  }

  const handlerSearchDialogUserList = (users: IUser[]) => {
    setSearchDialogUserList(users)
  }
  return (
    <div className={isMyDialogs ? classes.dialogs : ''}>
      {!isMyDialogs && (
        <Search
          handlerSearchDialogUserList={handlerSearchDialogUserList}
          setIsLoading={setIsLoading}
        />
      )}

      <div className={classes.btnGroup}>
        <Button
          styleBtn={isMyDialogs ? { color: '#00A3FF' } : {}}
          onClick={() => onSwitchDialogs(true)}
          buttonType={BUTTON_TYPE.BUTTON}
          buttonClassName={BUTTON_CLASS_NAME.SWITCH}
          content="MY CHATS"
        />
        <Button
          styleBtn={!isMyDialogs ? { color: '#00A3FF' } : {}}
          onClick={() => onSwitchDialogs(false)}
          buttonType={BUTTON_TYPE.BUTTON}
          buttonClassName={BUTTON_CLASS_NAME.SWITCH}
          content="SEARCH CHATS"
        />
      </div>
      <div className={classes.list}>
        {isLoading ? (
          <Loader />
        ) : (
          userList.map((user) => {
            return (
              <User
                lastMessage={user.lastMessage}
                myEmail={myEmail}
                key={user.userId}
                userName={user.userName}
                email={user.email}
                userId={user.userId}
                isSelected={user.email === currentDialogUser?.email}
                // myUserId={myUserId}
                avatar={user.avatar}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
