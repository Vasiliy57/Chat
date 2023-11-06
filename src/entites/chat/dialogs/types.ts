export interface IUser {
  userName: string
  email: string
  img?: string
  userId: string
  avatar: string
}

export interface DialogsProps {
  isMyDialogs: boolean
  onSwitchDialogs: (dialogs: boolean) => void
}
