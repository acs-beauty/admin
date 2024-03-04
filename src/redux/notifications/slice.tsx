import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INotification } from "../../types/notifications/INotification.ts"
import { rows } from "../../components/NotificationsComponents/notificationsData.ts"

export interface NotificationsState {
  notifications: INotification[]
  isLoading: boolean
  error: unknown | null
}

const initialState: NotificationsState = {
  notifications: rows,
  isLoading: false,
  error: null,
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    deleteItem: (state, action: PayloadAction<NotificationsState>) => {
      state.notifications = state.notifications.filter(item => item.id !== +action.payload)
    },
  },
})

export const { deleteItem } = notificationsSlice.actions

export const notifications = notificationsSlice.reducer
