
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
}

export const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  reducers: {

  },
})

// export const { 'actions' } = authorizationSlice.actions
export default authorizationSlice.reducer