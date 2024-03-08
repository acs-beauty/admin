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

  //   // <---------- patch ---------->
  //   patchBrand: (id: GridRowId, formData: FormData) =>
  //     instance.patch<IBrand>(`brand/${id}`, formData),

  //   // <---------- delete ---------->
  //   deleteBrand: (id: GridRowId) => instance.delete(`brand/${id}`),
}
