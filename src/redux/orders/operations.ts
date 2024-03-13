import { createAsyncThunk } from "@reduxjs/toolkit"
import { ordersApi } from "../../api/orders/ordersApi"
import { IOrder, IResponse, IGetOrdersParams, IOrderById } from "src/types/orders"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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

export const getOrderById = createAsyncThunk<IOrderById, string>(
  "orders/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await ordersApi.getOrderById(id)

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

      toast.success("Замовлення успішно створено")
      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const patchOrder = createAsyncThunk<IOrder, { id: string; values: IOrder }>(
  "orders/patchOrder",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await ordersApi.patchOrder(id, values)

      toast.success("Замовлення успішно змінено")
      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const deleteOrder = createAsyncThunk<{ id: number }, number>(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await ordersApi.deleteOrder(id)

      return { id }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
