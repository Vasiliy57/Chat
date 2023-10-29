export interface ISetUser {
  email: string | null
  emailVerified: boolean
  userName?: string | null
  userId: string | null
  avatar: null | string
  infoAboutMe: null | string | undefined
  number: null | string | undefined
  address: null | string | undefined
}

export interface IState {
  user: ISetUser
  isAuth: boolean
}
