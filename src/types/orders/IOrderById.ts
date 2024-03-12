export interface IOrderById {
  id: number
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
  createdAt: string
  products: [
    {
      name: string
      price: number
      discount: number
      count: number
      images: [
        {
          url: string
        }
      ]
    }
  ]
}
