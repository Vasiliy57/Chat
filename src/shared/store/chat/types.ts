
export interface IUser {
  userName: string | null
  email: string | null
  img?: string
  userId: string | null
}

export interface IChat {
  currentDialogUser: IUser
  currentDialogId: null | string
}