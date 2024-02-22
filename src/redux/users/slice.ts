import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./operations"

interface IUserState {
  isAuth: boolean
}

const initialState: IUserState = {
  isAuth: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuth = action.payload
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuth = action.payload
    })
  },
})

export const user = userSlice.reducer
