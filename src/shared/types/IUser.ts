interface ILastMessage {
  content: string
  date: number
  email: string
  type: string
  userName: string
  smileDetector: Record<string, string>
  isRead: boolean
}

export interface IUser {
  userName: string
  email: string
  // img: string | null
  userId: string
  avatar: string | null
  lastMessage?: ILastMessage
}
