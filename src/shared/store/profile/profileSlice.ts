import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISetUser, IState } from './types'

const initialState: IState = {
  user: {
    email: null,
    emailVerified: false,
    userName: null,
    userId: null
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
  },
})

export const { setUser } = profileSlice.actions

export default profileSlice.reducer

