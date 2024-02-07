import React from "react"
import s from "./OrderCompositMenu.module.scss"
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

const goods: IGood[] = [
  {
    id: "1",
    photoUrl: goodImg,
    title: "Спрей-тонер з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
  {
    id: "2",
    photoUrl: goodImg,
    title: "Спрей-тонер з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
  {
    id: "3",
    photoUrl: goodImg,
    title: "Спрей-тонер з пантенолом Geek & Gorgeous Liquid Hydration",
    goodId: "56780",
    quantity: "1 шт",
    price: "387 грн",
    discount: "64 грн",
    total: "323 грн",
  },
]

const OrderCompositMenu = () => {
  return (
    <div className={s.orderCompositMenu__container}>
      <button type="button" className={s.orderCompositMenu__buttons_addGoods}>
        ДОДАТИ ТОВАРИ
      </button>
      <div className={s.table__container}>
        <div className={s.table__header}>
          <p className={s.table__header_text}>Назва товару</p>
          <p className={s.table__header_text}>ID товару</p>
          <p className={s.table__header_text}>Кількість</p>
          <p className={s.table__header_text}>Ціна</p>
          <p className={s.table__header_text}>Знижка</p>
          <p className={s.table__header_text}>Всього</p>
        </div>
        {goods.length > 0 ? (
          <ul className={s.list}>
            {goods.map((good: IGood) => (
              <li key={good.id} className={s.list__item}>
                <div className={s.list__item_group}>
                  <img src={good.photoUrl} alt="good" className={s.list__item_img} />
                  <p className={s.list__item_text}>{good.title}</p>
                </div>
                <p className={s.list__item_text}>{good.goodId}</p>
                <p className={s.list__item_text}>{good.quantity}</p>
                <p className={s.list__item_text}>{good.price}</p>
                <p className={s.list__item_text}>{good.discount}</p>
                <p className={s.list__item_text}>{good.total}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.list__notification}>
            <p className={s.table__total_text}>Додайте товари до замовлення</p>
          </div>
        )}
        {goods.length > 0 && (
          <div className={s.table__total_wrapper}>
            <p className={s.table__total_text}>Всього товарів: {goods.length} шт</p>
            <p className={s.table__total_text}>Загальна сума: 1260 грн</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderCompositMenu
