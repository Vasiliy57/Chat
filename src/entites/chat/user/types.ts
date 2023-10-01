

export interface IUser {
  name?: string
  email?: string
  img?: string
  key?: string | number
  selectedUserEmail?: string | null
  onSelectUser: (name?: string, email?: string) => void
}