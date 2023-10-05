import React from "react"

interface IUser {
  userName: string | null
  email: string | null
  img?: string
  key?: string | number
}

export interface IFriendsProps {
  data: Array<IUser>
  renderDialog?: React.ReactNode
  selectDialog: (email: string | null, userName: string | null) => void
  currentDialogUser: IUser
}