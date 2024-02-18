import React, { useState, useEffect } from "react"
import s from "./OrderCompositMenu.module.scss"
import { goods } from "./goods"
import AddGoodsModal from "../AddGoodsModal/AddGoodsModal"
import { IGood } from "./goods"
import TrashIcon from "src/images/svg/TrashIcon"
// import { Table, IColumn } from "../Table/Table"

const OrderCompositMenu = () => {
  const [isAddGoodsModalOpen, setIsAddGoodsModalOpen] = useState<boolean>(false)
  const [checkedGoodsIds, setCheckedGoodsIds] = useState<string[]>([])
  const [goodsArrayToRender, setGoodsArrayToRender] = useState<IGood[]>([])
  const [quantities, setQuantities] = useState<number[]>(Array(goods.length || 1).fill(1))
  const [discounts, setDiscounts] = useState<number[]>(Array(goods.length || 10).fill(10))

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
    const arrayAfterDelete = goodsArrayToRender.filter((good: IGood) => good.id !== id)
    setGoodsArrayToRender(arrayAfterDelete)
  }

  // const columns: IColumn[] = [
  //   { field: "title", headerName: "Назва товару", width: 450 },
  //   { field: "id", headerName: "ID товару", width: 100 },
  //   {
  //     field: "quantity",
  //     headerName: "Кільксть, шт",
  //     type: "number",
  //     align: "center",
  //     editable: true,
  //     width: 100,
  //   },
  //   { field: "price", headerName: "Ціна, грн", type: "number", align: "center", width: 80 },
  //   {
  //     field: "discount",
  //     headerName: "Знижка, %",
  //     type: "number",
  //     align: "center",
  //     editable: true,
  //     width: 80,
  //   },
  //   { field: "total", headerName: "Всього, грн", type: "number", align: "center", width: 100 },
  // ]

  // const rows = goodsArrayToRender

  const totalSum = goodsArrayToRender.reduce((total, good) => total + good.total, 0)

  const handleAddGoodsModalToggle = () => {
    setIsAddGoodsModalOpen(!isAddGoodsModalOpen)
  }

  const getCheckedgoodsIds = (arrayIds: string[]) => {
    setCheckedGoodsIds(arrayIds)
  }

  // const handleEdit = (id: number) => {
  //   console.log(`Edit order with id: ${id}`)
  // }

  useEffect(() => {
    const foundGoods: (IGood | undefined)[] = checkedGoodsIds.map((goodId: string) =>
      goods.find(good => good?.id === goodId)
    )

    const filteredGoods: IGood[] = foundGoods.filter(good => good !== undefined) as IGood[]

    setGoodsArrayToRender(filteredGoods)
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
          <p className={s.table__header_text}>Ціна, грн</p>
          <p className={s.table__header_text}>Знижка, %</p>
          <p className={s.table__header_text}>Всього, грн</p>
        </div>
        {goodsArrayToRender.length > 0 ? (
          <ul className={s.list}>
            {goodsArrayToRender.map(
              (good: IGood | undefined, index) =>
                good && (
                  <li key={good.id} className={s.list__item}>
                    <div className={s.list__item_group}>
                      <img src={good.photoUrl} alt="good" className={s.list__item_img} />
                      <p className={s.list__item_text}>{good.title}</p>
                    </div>
                    <p className={s.list__item_textNumbers}>{good.goodId}</p>
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
                    <p className={s.list__item_textNumbers}>{good.total}</p>
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

        {/* {goodsArrayToRender.length > 0 ? (
          <div className={s.table}>
            <Table columns={columns} rows={rows} onExternalDataUpdate={handleEdit} />
          </div>
        ) : (
          <div className={s.list__notification}>
            <p className={s.table__total_text}>Додайте товари до замовлення</p>
          </div>
        )} */}

        {goodsArrayToRender.length > 0 && (
          <div className={s.table__total_wrapper}>
            <p className={s.table__total_text}>Всього товарів: {goodsArrayToRender.length} шт</p>
            <p className={s.table__total_text}>Загальна сума: {totalSum} грн</p>
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
