import { IUser } from "@/entites/chat/dialogs/types"
import { TypeOnSelectDialog } from "@pages/chat/types"

export interface MenuDialogsProps {
  dialogUserList: any[]
  onSelectDialog: TypeOnSelectDialog
  currentDialogUser: IUser | null
}

