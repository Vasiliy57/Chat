import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISelectedUser, ISetUser, IState } from './types'

const initialState: IState = {
  user: {
    email: null,
    emailVerified: false,
    userName: null,
    friends: []
  },
  selectedUser: {
    email: null,
    userName: null,
  },
  isAuth: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ISetUser>) => {
      state.user = { ...state.user, ...action.payload }
      state.isAuth = true
    },
    selectUser: (state, action: PayloadAction<ISelectedUser>) => {
      state.selectedUser = action.payload
    }
  },
})

export const { setUser, selectUser } = profileSlice.actions

export default profileSlice.reducer

