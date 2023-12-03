export interface IUser {
  userName: string
  email: string
  avatar: string | null
  userId: string
}

// export interface IUserInSearch {
//   email: string
//   emailVerified: boolean
//   userName: string
//   uid: string
//   img: string | null
//   userId: string
//   avatar: string | null
// }

export interface IChat {
  currentDialogUser: IUser | null
  currentDialogId: null | string
  // usersInSearch: IUserInSearch[]
}
