export interface UserProps {
  userName: string
  email: string
  img?: string
  key?: string | number
  userId: string
  isSelected: boolean
  myUserId: string | null
}

export interface ILastMessage {
  content: string
  date: string
  email: string
  type: string
  userName: string
}
