import { instance } from "../instance"
import { IProductResponse } from "../../types/products"

export const productsApi = {
  // <--------get-------->

  getProducts({ page = 1, pageSize = 10 }) {
    return instance.get<IProductResponse>(`product?page=${page}&pageSize=${pageSize}`)
  },
}
