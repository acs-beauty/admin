import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AdminLayout from "src/layouts/AdminLayout"
import s from "./UpdateOrder.module.scss"
import ArrowToLeft from "src/images/svg/ArrowToLeft"
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon"
import ArrowToTopFlatIcon from "src/images/svg/ArrowToTopFlatIcon"
import { initialStateType } from "../../components/GeneralInfoMenu/GeneralInfoMenu"
import EditGeneralInfoMenu from "src/components/EditGeneralInfoMenu/EditGeneralInfoMenu"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/redux/hooks"
import { getOrderById, patchOrder } from "src/redux/orders/operations.ts"
import { selectOrder } from "src/redux/orders/selectors.ts"
import EditOrderCompositMenu, {
  IProductInOrder,
} from "src/components/OrderCompositMenu/EditOrderCompositMenu"
import { IOrder } from "src/types/orders"

const UpdateOrder = () => {
  const [isEditGeneralInfoMenuOpen, setIsEditGeneralInfoMenuOpen] = useState<boolean>(true)
  const [isOrderCompositMenuOpen, setIsOrderCompositMenuOpen] = useState<boolean>(true)
  const [ttn, setTtn] = useState<string>("")
  const [ids, setIds] = useState<string>("")
  const [quantities, setQuantities] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const order = useSelector(selectOrder)
  const navigate = useNavigate()

  const [products, setProducts] = useState<IProductInOrder[]>([])

  useEffect(() => {
    if (id) dispatch(getOrderById(id))
  }, [dispatch, id])

  useEffect(() => {
    setProducts(order.products)
  }, [order])

  const initialValues: initialStateType = {
    name: "",
    email: "",
    phone: "",
    adress: "",
    delivery: "",
    payment: "",
    comment: "",
    status: false,
    ttn: "",
  }

  const [orderStatus, setOrderStatus] = useState<string>(order.status)

  const [editGeneralInfoValues, setEditGeneralInfoValues] =
    useState<initialStateType>(initialValues)

  useEffect(() => {
    setOrderStatus(order.status)
  }, [order])

  useEffect(() => {
    setIds(products.map((value: IProductInOrder) => value.id).toString())
  }, [products])

  const getEditGeneralInfoValues = (values: initialStateType) => {
    setEditGeneralInfoValues(values)
  }

  const getProducts = (newProducts: IProductInOrder[]) => {
    setProducts(newProducts)
  }

  const getQuantities = (quantities: number[]) => {
    setQuantities(quantities.toString())
  }

  const getOrderStatus = (status: boolean): void => {
    const isPaid = status === false ? "pending" : "paid"
    setOrderStatus(isPaid)
  }

  const getTtn = (ttn: string) => {
    setTtn(ttn)
  }

  const getTotal = (total: number) => {
    setTotal(total)
  }

  const [lastName, firstName] = editGeneralInfoValues.name.split(" ")

  const editedOrder: IOrder = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: editGeneralInfoValues.email,
    phone: editGeneralInfoValues.phone,
    status: orderStatus,
    deliveryType: editGeneralInfoValues.delivery,
    address: editGeneralInfoValues.adress,
    paymentType: editGeneralInfoValues.payment,
    tth: ttn,
    comment: editGeneralInfoValues.comment,
    productIds: ids,
    productCounts: quantities,
    total,
  }

  const handleSaveChanges = () => {
    console.log("EDITED", editedOrder)
    if (id) dispatch(patchOrder({ id, values: editedOrder }))
    navigate("/orders")
  }

  const handleOrderClear = () => {
    navigate("/orders")
  }

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__section_titleWrapper}>
            <ArrowToLeft />
            <p className={s.main__section_titleText}>Замовлення № {order.id}</p>
          </div>
          <div className={s.createdNewOrderDetails}>
            <div>
              <p className={s.createdNewOrderDetails__info_text}>
                Дата створення:{" "}
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
              </p>
              <p className={s.createdNewOrderDetails__info_text}>
                Статус замовлення: {orderStatus}
              </p>
              <p className={s.createdNewOrderDetails__info_text}>ТТН: {order.tth}</p>
            </div>
          </div>
          <div className={s.orderBlockToFill}>
            <div className={s.orderBlockToFill__list}>
              <div
                className={s.orderBlockToFill__list_item}
                onClick={() => setIsEditGeneralInfoMenuOpen(!isEditGeneralInfoMenuOpen)}
              >
                <p className={s.list_itemText}>Основна інформація</p>
                {isEditGeneralInfoMenuOpen ? (
                  <ArrowToTopFlatIcon size={32} />
                ) : (
                  <ArrowToBottomIcon size={32} />
                )}
              </div>
              {isEditGeneralInfoMenuOpen && (
                <EditGeneralInfoMenu
                  getOrderStatus={getOrderStatus}
                  getTtn={getTtn}
                  getEditGeneralInfoValues={getEditGeneralInfoValues}
                />
              )}
              <div
                className={s.orderBlockToFill__list_item}
                onClick={() => setIsOrderCompositMenuOpen(!isOrderCompositMenuOpen)}
              >
                <p className={s.list_itemText}>Склад замовлення</p>
                {isOrderCompositMenuOpen ? (
                  <ArrowToTopFlatIcon size={32} />
                ) : (
                  <ArrowToBottomIcon size={32} />
                )}
              </div>
              {isOrderCompositMenuOpen && (
                <EditOrderCompositMenu
                  getQuantities={getQuantities}
                  getTotal={getTotal}
                  getProducts={getProducts}
                />
              )}
            </div>
            <div className={s.orderBlockToFill__buttons}>
              <button
                type="button"
                className={s.orderBlockToFill__buttons_removeBtn}
                onClick={handleOrderClear}
              >
                ВІДМІНИТИ
              </button>
              <button
                type="button"
                className={s.orderBlockToFill__buttons_saveBtn}
                onClick={handleSaveChanges}
              >
                ЗБЕРЕГТИ ЗМІНИ
              </button>
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  )
}

export default UpdateOrder
