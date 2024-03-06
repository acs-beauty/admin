import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOrder } from "src/types/orders"
import { getOrders, createNewOrder } from "./operations"

export interface OrdersState {
  count: number
  orders: IOrder[]
  isLoading: boolean
  error: unknown | null
}

const initialState: OrdersState = {
  count: 0,
  orders: [],
  isLoading: false,
  error: null,
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload)
      state.count += 1
    },

    // updateBrand: (state, action: PayloadAction<IBrand>) => {
    //   const updatedBrand = action.payload
    //   const index = state.brands.findIndex(brand => brand.id === updatedBrand.id)

    //   if (index === -1) return
    //   state.brands[index] = updatedBrand
    // },

    // deleteBrand: (state, action) => {
    //   state.brands = state.brands.filter(brand => brand.id !== action.payload.id)
    //   state.count -= 1
    // },
  },

  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, handlePending)
      .addCase(getOrders.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.orders = action.payload.rows
        state.isLoading = false
        state.error = null
      })
      .addCase(getOrders.rejected, handleRejected)

      .addCase(createNewOrder.pending, handlePending)
      .addCase(createNewOrder.fulfilled, (state, action) => {
        ordersSlice.caseReducers.addOrder(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(createNewOrder.rejected, handleRejected)

    //   .addCase(patchBrand.pending, handlePending)
    //   .addCase(patchBrand.fulfilled, (state, action) => {
    //     brandsSlice.caseReducers.updateBrand(state, action)
    //     state.isLoading = false
    //     state.error = null
    //   })
    //   .addCase(patchBrand.rejected, handleRejected)

    //   .addCase(deleteBrand.pending, handlePending)
    //   .addCase(deleteBrand.fulfilled, (state, action) => {
    //     brandsSlice.caseReducers.deleteBrand(state, action)
    //     state.isLoading = false
    //     state.error = null
    //   })
    //   .addCase(deleteBrand.rejected, handleRejected)
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

export const orders = ordersSlice.reducer
