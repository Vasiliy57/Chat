export interface IMessages {
  currentDialogUser: {
    email: string | null
    userName: string | null
  }
  dialogId: string | null
}

export interface IMessage {
  type: string
  content: string
  date: string
  email: string
  userName: string
  smileDetector: Record<string, string>
  id: string
}
