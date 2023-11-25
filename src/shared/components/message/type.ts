export interface messageProps {
  isMyMessage: boolean
  content: string
  date: string
  typeMessage: string
  userName: string
  smileDetector: Record<string, string>
  avatar?: string | null
}
