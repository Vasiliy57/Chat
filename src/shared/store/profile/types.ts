export interface ISetUser {
  email: string | null
  emailVerified: boolean
  userName?: string | null
  userId: string | null
  avatar: null | string
  infoAboutMe: null | string
  number: null | string
  address: null | string
}

export interface IState {
  user: ISetUser
  isAuth: boolean
}
