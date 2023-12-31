interface ILastMessage {
  content: string
  date: string
  email: string
  type: string
  userName: string
  smileDetector: Record<string, string>
  isRead: boolean
}
export interface UserProps {
  userName: string
  lastMessage: ILastMessage | null
  email: string
  key?: string | number
  userId: string
  isSelected: boolean
  avatar: null | string
  myEmail: string | null
}
