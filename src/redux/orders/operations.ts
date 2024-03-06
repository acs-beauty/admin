import { createAsyncThunk } from "@reduxjs/toolkit"
import { ordersApi } from "src/api/orders/ordersApi"
import { IOrder, IResponse, IGetOrdersParams } from "src/types/orders"

export const getOrders = createAsyncThunk<IResponse, IGetOrdersParams>(
  "orders/getOrders",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await ordersApi.getOrders(params)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const createNewOrder = createAsyncThunk<IOrder, IOrder>(
  "orders/createNewOrder",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await ordersApi.postOrder(values)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

// export const patchBrand = createAsyncThunk<IBrand, { id: GridRowId; formData: FormData }>(
//   "brands/patchBrand",
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const { data } = await brandsApi.patchBrand(id, formData)

//       return data
//     } catch (error: unknown) {
//       return rejectWithValue(error)
//     }
//   }
// )

// export const deleteBrand = createAsyncThunk<{ id: GridRowId }, GridRowId>(
//   "brands/deleteBrand",
//   async (id, { rejectWithValue }) => {
//     try {
//       await brandsApi.deleteBrand(id)

//       return { id }
//     } catch (error: unknown) {
//       return rejectWithValue(error)
//     }
//   }
// )
