import { Dialogs, Search } from "@/entites/chat"
import { Logo } from "@shared/components"
import { MenuDialogsProps } from "./types"
import { useState, useEffect } from 'react'

import classes from './menuDialogs.module.css'

export const MenuDialogs: React.FC<MenuDialogsProps> = ({ myUserId, onSelectDialog, currentDialogUser }) => {
  const [isMyDialogs, setIsMyDialogs] = useState<boolean>(true)

  const onSwitchDialogs = (dialogs: boolean) => {
    setIsMyDialogs(dialogs)

  }

  return (
    <div className={classes.menuDialogs}>
      <Logo />
      {!isMyDialogs && <Search />}
      <Dialogs
        myUserId={myUserId}
        isMyDialogs={isMyDialogs}
        onSelectDialog={onSelectDialog}
        currentDialogUser={currentDialogUser}
        onSwitchDialogs={onSwitchDialogs}
      />
    </div>
  )
}

