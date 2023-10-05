

export interface IUser {
  userName: string | null
  email: string | null
  img?: string
  key?: string | number
  selectedUserEmail?: string | null
  selectDialog: (name: string | null, email: string | null) => void
  currentDialogUser: { userName: string | null, email: string | null }
}