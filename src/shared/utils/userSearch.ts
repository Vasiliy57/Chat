interface IUser {
  email: string
  emailVerified: boolean
  userName: string
  uid: string
  img: string | null
  userId: string
  avatar: string | null
}

export const userSearch = (value: string, users: IUser[]) => {
  return users.filter((user) => user.userName.includes(value))
}
