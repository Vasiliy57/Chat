export interface IUser {
  email: string
  emailVerified: boolean
  userName: string
  uid: string
  img: string | null
  userId: string
  avatar: string | null
}

export interface IData {
  user: IUser
}
export interface IStateProfile {
  ProfileReducer: {
    isAuth: boolean
  }
}
