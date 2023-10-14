import { Dialogs, Search } from "@/entites/chat"
import { Logo } from "@shared/components"
import { MenuDialogsProps } from "./types"


export const MenuDialogs: React.FC<MenuDialogsProps> = ({ dialogUserList, onSelectDialog, currentDialogUser }) => {
  return (
    <>
      <Logo />
      <Search />
      <Dialogs
        data={dialogUserList}
        onSelectDialog={onSelectDialog}
        currentDialogUser={currentDialogUser}
      />
    </>
  )
}

