import React, { useEffect, useState } from "react"
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

interface CompositMenuProps {
  getCompositMenuValues: (values: IProduct[]) => void
  getQuantities: (quantities: number[]) => void
  isClicked: boolean
  setIsClicked: (value: boolean) => void
}

const OrderCompositMenu = ({
  getCompositMenuValues,
  getQuantities,
  isClicked,
  setIsClicked,
}: CompositMenuProps) => {
  const [isAddGoodsModalOpen, setIsAddGoodsModalOpen] = useState<boolean>(false)
  const [goods, setGoods] = useState<IProduct[]>([])
  const [quantities, setQuantities] = useState<number[]>(Array(goods.length).fill(1))
  // const [discounts, setDiscounts] = useState<number[]>(Array(goods.length).fill(0))

  useEffect(() => {
    if (isClicked) setGoods([])
    setIsClicked(false)
  }, [isClicked, setIsClicked])

  useEffect(() => {
    getQuantities(quantities)
  }, [getQuantities, quantities])

  useEffect(() => {
    // Update quantities based on the length of goods
    setQuantities(Array(goods.length).fill(1))
  }, [goods])

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  // const handleDiscountChange = (index: number, value: number) => {
  //   const newDiscounts = [...discounts]
  //   newDiscounts[index] = value
  //   setDiscounts(newDiscounts)
  // }

  const handleDeleteGood = (id: string) => {
    const arrayAfterDelete = goods.filter((good: IProduct) => good.id !== id)
    setGoods(arrayAfterDelete)
  }

  const totalSum = goods.reduce(
    (sum, good, index) =>
      sum + (Number(good?.price) - Number(good?.price) * (good.discount / 100) * quantities[index]),
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
                      type="number"
                      value={quantities[index] || 1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      className={s.list__item_qty}
                    />
                    <p className={s.list__item_textNumbers}>{good.price}</p>
                    <p className={s.list__item_textNumbers}>{Number(good.discount)}</p>
                    {/* <input
                      type="number"
                      defaultValue={good.discount}
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      //   handleDiscountChange(index, Number(e.target.value))
                      // }
                      className={s.list__item_qty}
                    /> */}
                    <p className={s.list__item_textNumbers}>
                      {quantities[index] &&
                        Number(
                          (
                            (Number(good.price) - Number(good.price) * (good.discount / 100)) *
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
          <AddGoodsModal
            onClose={handleAddGoodsModalToggle}
            getGoods={getGoods}
            getCompositMenuValues={getCompositMenuValues}
          />
        )}
      </div>
    </div>
  )
}

export default OrderCompositMenu
