import React, { useState } from "react"
import s from "./OrderCompositMenu.module.scss"
import AddGoodsModal from "../AddGoodsModal/AddGoodsModal"
import TrashIcon from "../../images/svg/TrashIcon"

export interface IProduct {
  id: string
  name: string
  price: number
  discount: number
  count: number
  novelty: boolean
  hit: boolean
  createdAt: string
  subcategoryName: string
  images: [
    {
      url: string
    }
  ]
}

const OrderCompositMenu = () => {
  const [isAddGoodsModalOpen, setIsAddGoodsModalOpen] = useState<boolean>(false)
  const [goods, setGoods] = useState<IProduct[]>([])
  const [quantities, setQuantities] = useState<number[]>(Array(goods.length || 50).fill(1))
  const [discounts, setDiscounts] = useState<number[]>(Array(goods.length || 50).fill(0))

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  const handleDiscountChange = (index: number, value: number) => {
    const newDiscounts = [...discounts]
    newDiscounts[index] = value
    setDiscounts(newDiscounts)
  }

  const handleDeleteGood = (id: string) => {
    const arrayAfterDelete = goods.filter((good: IProduct) => good.id !== id)
    setGoods(arrayAfterDelete)
  }

  const totalSum = goods.reduce(
    (sum, good, index) =>
      sum +
      (Number(good?.price) - Number(good?.price) * (discounts[index] / 100)) * quantities[index],
    0
  )

  const handleAddGoodsModalToggle = () => {
    setIsAddGoodsModalOpen(!isAddGoodsModalOpen)
  }

  const getGoods = (arrayToRender: IProduct[]) => {
    setGoods(arrayToRender)
  }

  return (
    <div className={s.orderCompositMenu__container}>
      <button
        type="button"
        onClick={handleAddGoodsModalToggle}
        className={s.orderCompositMenu__buttons_addGoods}
      >
        ДОДАТИ ТОВАРИ
      </button>
      <div className={s.table__container}>
        <div className={s.table__header}>
          <p className={s.table__header_text}>Назва товару</p>
          <p className={s.table__header_textCenter}>ID товару</p>
          <p className={s.table__header_textCenter}>Кількість</p>
          <p className={s.table__header_textCenter}>Ціна, грн</p>
          <p className={s.table__header_textCenter}>Знижка, %</p>
          <p className={s.table__header_textCenter}>Всього, грн</p>
        </div>
        {goods.length > 0 ? (
          <ul className={s.list}>
            {goods.map(
              (good: IProduct | undefined, index) =>
                good && (
                  <li key={good.id} className={s.list__item}>
                    <div className={s.list__item_group}>
                      <img src={good.images[0].url} alt="good" className={s.list__item_img} />
                      <p className={s.list__item_text}>{good.name}</p>
                    </div>
                    <p className={s.list__item_textNumbers}>{good.id}</p>
                    <input
                      value={quantities[index]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      className={s.list__item_qty}
                    />
                    <p className={s.list__item_textNumbers}>{good.price}</p>
                    <input
                      value={discounts[index]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleDiscountChange(index, Number(e.target.value))
                      }
                      className={s.list__item_qty}
                    />
                    <p className={s.list__item_textNumbers}>
                      {Number(
                        (
                          (Number(good.price) - Number(good.price) * (discounts[index] / 100)) *
                          quantities[index]
                        ).toFixed(2)
                      )}
                    </p>
                    <button
                      type="button"
                      className={s.list__item_deleteBtn}
                      onClick={() => handleDeleteGood(good.id)}
                    >
                      <TrashIcon />
                    </button>
                  </li>
                )
            )}
          </ul>
        ) : (
          <div className={s.list__notification}>
            <p className={s.table__total_text}>Додайте товари до замовлення</p>
          </div>
        )}

        {goods.length > 0 && (
          <div className={s.table__total_wrapper}>
            <p className={s.table__total_text}>Всього товарів: {goods.length} шт</p>
            <p className={s.table__total_text}>Загальна сума: {Number(totalSum.toFixed(2))} грн</p>
          </div>
        )}
        {isAddGoodsModalOpen && (
          <AddGoodsModal onClose={handleAddGoodsModalToggle} getGoods={getGoods} />
        )}
      </div>
    </div>
  )
}

export default OrderCompositMenu
