import { Dialogs, Search } from "@/entites/chat"
import { Logo } from "@shared/components"
import { useState } from 'react'

import classes from './menuDialogs.module.css'

export const MenuDialogs: React.FC = () => {
  const [isMyDialogs, setIsMyDialogs] = useState<boolean>(true)

  const onSwitchDialogs = (dialogs: boolean) => {
    setIsMyDialogs(dialogs)
  }

  return (
    <div className={classes.menuDialogs}>
      <Logo />
      {!isMyDialogs && <Search />}
      <Dialogs
        isMyDialogs={isMyDialogs}
        onSwitchDialogs={onSwitchDialogs}
      />
    </div>
  )
}

