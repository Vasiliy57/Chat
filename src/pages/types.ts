export interface IUser {
  email: string | null
  emailVerified: boolean
  userName?: string | null | undefined
  userId?: string | null
}

export interface IData {
  user: IUser
}
export interface IStateProfile {
  ProfileReducer: {
    isAuth: boolean
  }
}