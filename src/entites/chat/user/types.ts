export interface UserProps {
  userName: string
  email: string
  key?: string | number
  userId: string
  isSelected: boolean
  myUserId: string | null
  avatar: null | string
}

export interface ILastMessage {
  content: string
  date: string
  email: string
  type: string
  userName: string
}
