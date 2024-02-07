import goodImg from "../../images/photo/good.png"

interface IGood {
  id: string
  photoUrl: string
  title: string
  goodId: string
  quantity: string
  price: string
  discount: string
  total: string
}

export const goods: IGood[] = [
  {
    id: "1",
    photoUrl: goodImg,
    title: "Спрей-тонер один з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
  {
    id: "2",
    photoUrl: goodImg,
    title: "Спрей-тонер два з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
  {
    id: "3",
    photoUrl: goodImg,
    title: "Спрей-тонер три з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
  {
    id: "4",
    photoUrl: goodImg,
    title: "Спрей-тонер чотири з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
  {
    id: "5",
    photoUrl: goodImg,
    title: "Спрей-тонер п'ять з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
]
