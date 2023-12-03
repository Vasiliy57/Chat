import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IChat, IUser } from './types'

const initialState: IChat = {
  currentDialogUser: null,
  currentDialogId: null,
  // usersInSearch: [],
}

export const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentDialogUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentDialogUser = action.payload ? { ...action.payload } : null
    },
    setCurrentDialogId: (state, action: PayloadAction<string | null>) => {
      state.currentDialogId = action.payload
    },
    // setUsersInSearch: (state, action: PayloadAction<IUserInSearch[]>) => {
    //   state.usersInSearch = action.payload
    // },
  },
})

export const { setCurrentDialogUser, setCurrentDialogId } = chat.actions

export default chat.reducer
