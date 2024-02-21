import { configureStore } from "@reduxjs/toolkit"

import { categories } from "./categories/slice"
import { brands } from "./brands/slice"
import { news } from "./news/slice"

export const store = configureStore({
  reducer: {
    categories,
    brands,
    news,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
