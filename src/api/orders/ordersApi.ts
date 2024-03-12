import { instance } from "../instance"
import { IOrder, IResponse } from "src/types/orders"

export const ordersApi = {
  // <---------- get ---------->
  getOrders: ({ page = 1, pageSize = 25, lookup = "" }) =>
    instance.get<IResponse>(
      `order?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    ),

  // <---------- post ---------->
  postOrder: (values: IOrder) => instance.post<IOrder>("order/", values),

  // <---------- patch ---------->
  patchOrder: (id: number, values: IOrder) => instance.patch<IOrder>(`order/${id}`, values),

  // <---------- delete ---------->
  deleteOrder: (id: number) => instance.delete(`order/${id}`),
}
