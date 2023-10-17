import { IUser } from "@/entites/chat/dialogs/types"
import { TypeOnSelectDialog } from "@pages/chat/types"

export interface MenuDialogsProps {
  onSelectDialog: TypeOnSelectDialog
  currentDialogUser: IUser | null
  myUserId: string | null
}

