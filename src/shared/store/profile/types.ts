


export interface ISetUser {
  email: string | null
  emailVerified: boolean
  userName?: string | null | undefined

}


export interface IState {
  user: ISetUser,
  isAuth: boolean,

}