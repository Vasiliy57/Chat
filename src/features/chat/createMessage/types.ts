

export interface ICreateMessage {
  currentDialogUser: {
    email: string | null
    userName: string | null
    userId: string | null
  },
  dialogId: string | null
  setDialogId: (arg: string) => void
} 