import { createAsyncThunk } from "@reduxjs/toolkit"
import { IRootState } from "../store"
import { IUserAuth } from "src/types/users"
import { usersApi } from "src/api/users/usersApi"

const createUsersAsyncThunk = createAsyncThunk.withTypes<{
  state: IRootState
  rejectValue: unknown
}>()

export const loginUser = createUsersAsyncThunk<boolean, IUserAuth>(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await usersApi.loginUser(userData)
      if (res.status === 200) return true
      return false
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const registerUser = createUsersAsyncThunk<boolean, IUserAuth>(
  "user/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await usersApi.registerUser(userData)
      if (res.status === 201) return true
      return false
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
