export interface IUser {
  userName: string
  email: string
  avatar: string | null
  userId: string
}

export interface IChat {
  currentDialogUser: IUser | null
  currentDialogId: null | string
}
