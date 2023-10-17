


export interface ISetUser {
  email: string | null
  emailVerified: boolean
  userName?: string | null | undefined
  userId: string | null
}


export interface IState {
  user: ISetUser,
  isAuth: boolean,

}



