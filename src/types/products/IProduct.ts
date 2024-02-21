export interface IProduct {
  id: string
  name: string
  price: 0
  discount: 0
  count: 0
  novelty: true
  hit: true
  createdAt: string
  subcategoryName: string
  images: [
    {
      url: string
    }
  ]
}
