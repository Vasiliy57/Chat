import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IChat, IUser } from './types'

const initialState: IChat = {
  currentDialogUser: {
    userName: null,
    email: null,
    userId: null,
    avatar: null,
  },
  currentDialogId: null,
}

export const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentDialogUser: (state, action: PayloadAction<IUser>) => {
      state.currentDialogUser = { ...action.payload }
    },
    setCurrentDialogId: (state, action: PayloadAction<string | null>) => {
      state.currentDialogId = action.payload
    },
  },
})

export const { setCurrentDialogUser, setCurrentDialogId } = chat.actions

export default chat.reducer
