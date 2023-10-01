import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUsers } from './types'
import { getAllUsersFireStore } from '@/firebase/fireStore'

export const getUsers = createAsyncThunk(
  'users/getAllUsersFireStore',
  async (email: string | null | undefined) => {
    const response = await getAllUsersFireStore(email)
    return response
  }
)

const initialState: IUsers = {
  users: {
    allUsers: []
  },
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<IUsers>) => {
      state.users.allUsers = action.payload
    })
  },
})

// export const { getUsers } = usersSlice.actions

export default usersSlice.reducer

