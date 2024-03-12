import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOrder, IOrderById } from "src/types/orders"
import { getOrders, getOrderById, createNewOrder, deleteOrder, patchOrder } from "./operations"

export interface OrdersState {
  count: number
  orders: IOrder[]
  order: IOrderById
  isLoading: boolean
  error: unknown | null
}

const initialState: OrdersState = {
  count: 0,
  orders: [],
  order: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    deliveryType: "",
    address: "",
    paymentType: "",
    tth: "",
    comment: "",
    createdAt: "",
    products: [
      {
        name: "",
        price: 0,
        discount: 0,
        count: 0,
        images: [
          {
            url: "",
          },
        ],
      },
    ],
  },
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

    updateOrder: (state, action: PayloadAction<IOrder>) => {
      const updatedOrder = action.payload
      const index = state.orders.findIndex(order => order.id === updatedOrder.id)

      if (index === -1) return
      state.orders[index] = updatedOrder
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload.id)
      state.count -= 1
    },
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

      .addCase(getOrderById.pending, handlePending)
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.order = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getOrderById.rejected, handleRejected)

      .addCase(createNewOrder.pending, handlePending)
      .addCase(createNewOrder.fulfilled, (state, action) => {
        ordersSlice.caseReducers.addOrder(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(createNewOrder.rejected, handleRejected)

      .addCase(patchOrder.pending, handlePending)
      .addCase(patchOrder.fulfilled, (state, action) => {
        ordersSlice.caseReducers.updateOrder(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(patchOrder.rejected, handleRejected)

      .addCase(deleteOrder.pending, handlePending)
      .addCase(deleteOrder.fulfilled, (state, action) => {
        ordersSlice.caseReducers.deleteOrder(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteOrder.rejected, handleRejected)
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
