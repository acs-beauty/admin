import goodImg from "../../images/photo/good.png"

export interface IGood {
  id: string
  photoUrl: string
  title: string
  goodId: string
  quantity: number
  price: number
  discount: number
  total: number
  checked: boolean
}

export const goods: IGood[] = [
  {
    id: "1",
    photoUrl: goodImg,
    title: "Спрей-тонер один з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: 1,
    price: 387,
    discount: 10,
    total: 323,
    checked: false,
  },
  {
    id: "2",
    photoUrl: goodImg,
    title: "Спрей-тонер два з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: 1,
    price: 387,
    discount: 10,
    total: 323,
    checked: false,
  },
  {
    id: "3",
    photoUrl: goodImg,
    title: "Спрей-тонер три з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: 1,
    price: 387,
    discount: 10,
    total: 323,
    checked: false,
  },
  {
    id: "4",
    photoUrl: goodImg,
    title: "Спрей-тонер чотири з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: 1,
    price: 387,
    discount: 10,
    total: 323,
    checked: false,
  },
  {
    id: "5",
    photoUrl: goodImg,
    title: "Спрей-тонер п'ять з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: 1,
    price: 387,
    discount: 10,
    total: 323,
    checked: false,
  },
]
