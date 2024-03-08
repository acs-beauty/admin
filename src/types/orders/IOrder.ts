export interface IOrder {
  id?: number
  firstName: string
  lastName: string
  email: string
  phone: string
  status: string
  deliveryType: string
  address: string
  paymentType: string
  tth: string
  comment: string
  productIds: string
  productCounts: string
  createdAt?: string
  total?: number
}
