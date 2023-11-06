export interface IUser {
  userName: string | null
  email: string | null
  avatar: string | null
  userId: string | null
}

export interface IChat {
  currentDialogUser: IUser
  currentDialogId: null | string
}
