import { IOrder } from "./IOrder"

export interface IResponse {
  count: number
  rows: IOrder[]
}
