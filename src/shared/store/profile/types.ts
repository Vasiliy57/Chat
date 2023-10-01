


export interface ISetUser {
  email?: string | null
  emailVerified?: boolean
  userName?: string | null
  friends?: Array<ISetUser>
}

export interface ISelectedUser {
  email?: string
  userName?: string
}

export interface IState {
  user: ISetUser,
  isAuth: boolean,
  selectedUser: ISelectedUser
}