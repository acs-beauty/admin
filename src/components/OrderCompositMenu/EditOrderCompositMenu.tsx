import React, { useEffect, useState } from "react"
import s from "./OrderCompositMenu.module.scss"
import TrashIcon from "../../images/svg/TrashIcon"
import { useSelector } from "react-redux"
import { selectOrder } from "src/redux/orders/selectors"

export interface IProductInOrder {
  id: number
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

interface EditCompositMenuProps {
  getQuantities: (quantities: number[]) => void
  getTotal: (total: number) => void
  getProducts: (newProducts: IProductInOrder[]) => void
}

const EditOrderCompositMenu = ({ getQuantities, getTotal, getProducts }: EditCompositMenuProps) => {
  const order = useSelector(selectOrder)
  const [products, setProducts] = useState<IProductInOrder[]>([])
  const [quantities, setQuantities] = useState<number[]>([])

  useEffect(() => {
    setProducts(order.products)
  }, [order])

  useEffect(() => {
    const counts = products.map((product: IProductInOrder) => product.count)
    setQuantities(counts)
  }, [products])

  useEffect(() => {
    getQuantities(quantities)
  }, [getQuantities, quantities])

  useEffect(() => {
    getProducts(products)
  }, [getProducts, products])

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  const handleDeleteGood = (id: number) => {
    const arrayAfterDelete = products.filter((product: IProductInOrder) => product.id !== id)
    setProducts(arrayAfterDelete)
  }

  const totalSum = products.reduce(
    (sum, product, index) =>
      sum +
      (Number(product.price) - Number(product.price) * (Number(product.discount) / 100)) *
        Number(quantities[index]),
    0
  )

  useEffect(() => {
    getTotal(totalSum)
  }, [getTotal, totalSum])

  return (
    <div className={s.orderCompositMenu__container}>
      <div className={s.table__container}>
        <div className={s.table__header}>
          <p className={s.table__header_text}>Назва товару</p>
          <p className={s.table__header_textCenter}>ID товару</p>
          <p className={s.table__header_textCenter}>Кількість</p>
          <p className={s.table__header_textCenter}>Ціна, грн</p>
          <p className={s.table__header_textCenter}>Знижка, %</p>
          <p className={s.table__header_textCenter}>Всього, грн</p>
        </div>
        <ul className={s.list}>
          {products.length !== 0 &&
            products.map(
              (product: IProductInOrder | undefined, index) =>
                product && (
                  <li key={Math.random()} className={s.list__item}>
                    <div className={s.list__item_group}>
                      <img src={product.images[0].url} alt="good" className={s.list__item_img} />
                      <p className={s.list__item_text}>{product.name}</p>
                    </div>
                    <p className={s.list__item_textNumbers}>{product.id}</p>
                    <input
                      type="number"
                      value={quantities[index] || 0}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      className={s.list__item_qty}
                    />
                    <p className={s.list__item_textNumbers}>{product.price}</p>
                    <p className={s.list__item_textNumbers}>{product.discount}</p>
                    <p className={s.list__item_textNumbers}>
                      {quantities[index] &&
                        Number(
                          (
                            (Number(product.price) -
                              Number(product.price) * (Number(product.discount) / 100)) *
                            Number(quantities[index])
                          ).toFixed(2)
                        )}
                    </p>
                    <button
                      type="button"
                      className={s.list__item_deleteBtn}
                      onClick={() => handleDeleteGood(product.id)}
                    >
                      <TrashIcon />
                    </button>
                  </li>
                )
            )}
        </ul>
        <div className={s.table__total_wrapper}>
          <p className={s.table__total_text}>Всього товарів: {products.length} шт</p>
          <p className={s.table__total_text}>Загальна сума: {Number(totalSum.toFixed(2))} грн</p>
        </div>
      </div>
    </div>
  )
}

export default EditOrderCompositMenu
