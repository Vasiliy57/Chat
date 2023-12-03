export interface IUser {
  userName: string
  email: string
  img: string | null
  userId: string
  avatar: string | null
}

export interface DialogsProps {
  isMyDialogs: boolean
  onSwitchDialogs: (dialogs: boolean) => void
  searchDialogUserList: IUser[]
}
