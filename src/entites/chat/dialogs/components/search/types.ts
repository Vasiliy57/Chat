import { IUser } from '@shared/types/IUser'

export interface SearchProps {
  handlerSearchDialogUserList: (users: IUser[]) => void
  setIsLoading: (isLoadingL: boolean) => void
}
