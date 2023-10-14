import { TypeOnSelectDialog } from "@pages/chat/types"


export interface UserProps {
  userName: string
  email: string
  img?: string
  key?: string | number
  userId: string
  isSelected: boolean
  onSelectDialog: TypeOnSelectDialog
}