import { createSlice } from "@reduxjs/toolkit"
import { getProducts } from "./operations"
import { IProduct } from "src/types/products"

export interface ProductsState {
  count: number
  products: IProduct[]
  isLoading: boolean
  error: unknown | null
}

const initialState: ProductsState = {
  count: 0,
  products: [],
  isLoading: false,
  error: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, handlePending)
      .addCase(getProducts.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.products = action.payload.rows
        state.isLoading = false
        state.error = null
      })
      .addCase(getProducts.rejected, handleRejected)
  },
})

function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true
}

function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false
  state.error = action.payload
}

export const productsReducer = productsSlice.reducer
