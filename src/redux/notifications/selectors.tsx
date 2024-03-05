import { INotification } from "../../types/notifications/INotification.ts"

export const selectNotifications = (state: { notifications: { notifications: INotification[] } }) =>
  state.notifications.notifications
