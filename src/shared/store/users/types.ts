export interface IUser {
  email?: string | null
  userName?: string | null
}

export interface IUsers {
  users: {
    allUsers?: Array<IUser> | any
  }
}