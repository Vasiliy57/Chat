export interface AvatarProps {
  isEdit: boolean
  onHandlerInputFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  currentImg: string | null
  onHandlerEdit: () => void
}
