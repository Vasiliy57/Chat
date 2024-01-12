import { IUser } from '@shared/types/IUser'

export interface DialogsProps {
  isMyDialogs: boolean
  onSwitchDialogs: (dialogs: boolean) => void
  searchDialogUserList: IUser[]
}
export interface IUserSearch {
  email: string
  emailVerified: boolean
  userName: string
  uid: string
  img: string | null
  userId: string
  avatar: string | null
}
