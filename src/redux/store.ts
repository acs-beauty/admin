import { configureStore } from "@reduxjs/toolkit"
import { categories } from "./categories/slice"
import { brands } from "./brands/slice"
import { news } from "./news/slice"
import { user } from "./users/slice"

export const store = configureStore({
  reducer: {
    categories,
    brands,
    news,
    user,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
