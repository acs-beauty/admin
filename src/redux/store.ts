import { configureStore } from "@reduxjs/toolkit"

import { categories } from "./categories/slice"
import { brands } from "./brands/slice"
import { news } from "./news/slice"
import { notifications } from "./notifications/slice"

export const store = configureStore({
  reducer: {
    categories,
    brands,
    news,
    notifications,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
