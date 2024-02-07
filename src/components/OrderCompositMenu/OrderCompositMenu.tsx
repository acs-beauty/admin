import React, { useState, useEffect } from "react"
import s from "./OrderCompositMenu.module.scss"
import { goods } from "./goods"
import AddGoodsModal from "../AddGoodsModal/AddGoodsModal"

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

const OrderCompositMenu = () => {
  const [isAddGoodsModalOpen, setIsAddGoodsModalOpen] = useState<boolean>(false)
  const [checkedGoodsIds, setCheckedGoodsIds] = useState<string[]>([])
  const [goodsArrayToRender, setGoodsArrayToRender] = useState<(IGood | undefined)[]>([])

  const handleAddGoodsModalToggle = () => {
    setIsAddGoodsModalOpen(!isAddGoodsModalOpen)
  }

  const getCheckedgoodsIds = (arrayIds: string[]) => {
    setCheckedGoodsIds(arrayIds)
  }

  useEffect(() => {
    const foundGoods = checkedGoodsIds.map((goodId: string) =>
      goods.find(good => good?.id === goodId)
    )
    if (foundGoods) setGoodsArrayToRender(foundGoods)
  }, [checkedGoodsIds])

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
          <p className={s.table__header_text}>ID товару</p>
          <p className={s.table__header_text}>Кількість</p>
          <p className={s.table__header_text}>Ціна</p>
          <p className={s.table__header_text}>Знижка</p>
          <p className={s.table__header_text}>Всього</p>
        </div>
        {goodsArrayToRender.length > 0 ? (
          <ul className={s.list}>
            {goodsArrayToRender.map(
              (good: IGood | undefined) =>
                good && (
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
                )
            )}
          </ul>
        ) : (
          <div className={s.list__notification}>
            <p className={s.table__total_text}>Додайте товари до замовлення</p>
          </div>
        )}
        {goodsArrayToRender.length > 0 && (
          <div className={s.table__total_wrapper}>
            <p className={s.table__total_text}>Всього товарів: {goodsArrayToRender.length} шт</p>
            <p className={s.table__total_text}>Загальна сума: 1260 грн</p>
          </div>
        )}
        {isAddGoodsModalOpen && (
          <AddGoodsModal
            onClose={handleAddGoodsModalToggle}
            getCheckedgoodsIds={getCheckedgoodsIds}
          />
        )}
      </div>
    </div>
  )
}

export default OrderCompositMenu
