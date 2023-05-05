import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    account : {}
}
const profileSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
      login: (state, action) => {
        state.account = action.payload
        
      },
      logout: (state, action) => {
        state.account = {}
      },
    },
  })
  
export const { login, logout } = profileSlice.actions

export default profileSlice.reducer
