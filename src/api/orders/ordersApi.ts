import { instance } from "../instance"
import { IOrder, IOrderById, IResponse } from "src/types/orders"

export const ordersApi = {
  // <---------- get ---------->
  getOrders: ({ page = 1, pageSize = 25, lookup = "" }) =>
    instance.get<IResponse>(
      `order?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    ),

  // <---------- get by ID ----->
  getOrderById: (id: string) => instance.get<IOrderById>(`order/${id}`),

  // <---------- post ---------->
  postOrder: (values: IOrder) => instance.post<IOrder>("order/", values),

  // <---------- patch --------->
  patchOrder: (id: string, values: IOrder) => instance.patch<IOrder>(`order/${id}`, values),

  // <---------- delete -------->
  deleteOrder: (id: number) => instance.delete(`order/${id}`),
}
