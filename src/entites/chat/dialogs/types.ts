import { TypeOnSelectDialog } from "@pages/chat/types"
import React from "react"

export interface IUser {
  userName: string
  email: string
  img?: string
  userId: string
}

export interface DialogsProps {
  myUserId: string | null
  isMyDialogs: boolean
  renderDialog?: React.ReactNode
  onSelectDialog: TypeOnSelectDialog
  currentDialogUser: IUser | null
  onSwitchDialogs: (dialogs: boolean) => void
}