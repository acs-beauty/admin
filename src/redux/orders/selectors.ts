import { IOrder } from "src/types/orders"

export const selectIsLoading = (state: { orders: { isLoading: boolean } }) => state.orders.isLoading

export const selectIsError = (state: { orders: { error: unknown | null } }) => state.orders.error

export const selectOrders = (state: { orders: { orders: IOrder[] } }) => state.orders.orders

export const selectCount = (state: { orders: { count: number } }) => state.orders.count
