import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AdminLayout from "src/layouts/AdminLayout"
import s from "./UpdateOrder.module.scss"
import ArrowToLeft from "src/images/svg/ArrowToLeft"
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon"
import ArrowToTopFlatIcon from "src/images/svg/ArrowToTopFlatIcon"
import OrderCompositMenu, { IProduct } from "src/components/OrderCompositMenu/OrderCompositMenu"
import { initialStateType } from "../../components/GeneralInfoMenu/GeneralInfoMenu"
import { IOrder } from "src/types/orders"
import EditGeneralInfoMenu from "src/components/EditGeneralInfoMenu/EditGeneralInfoMenu"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/redux/hooks"
import { getOrderById } from "src/redux/orders/operations.ts"
import { selectOrder } from "src/redux/orders/selectors.ts"
import EditOrderCompositMenu from "src/components/OrderCompositMenu/EditOrderCompositMenu"

const UpdateOrder = () => {
  const [isEditGeneralInfoMenuOpen, setIsEditGeneralInfoMenuOpen] = useState<boolean>(true)
  const [isOrderCompositMenuOpen, setIsOrderCompositMenuOpen] = useState<boolean>(true)
  const [ttn, setTtn] = useState<string>("")
  const [ids, setIds] = useState<string>("")
  const [quantities, setQuantities] = useState<string>("")
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const order = useSelector(selectOrder)

  useEffect(() => {
    if (id) dispatch(getOrderById(id))
  }, [dispatch, id])

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
  //   const [editCompositMenuValues, setEditCompositMenuValues] = useState<IProduct[]>([])

  //   const dispatch = useAppDispatch()

  //   useEffect(() => {
  //     const getOrderById = async () => {
  //       if (id) {
  //         try {
  //           const { data } = await ordersApi.getOrderById(id)
  //           setOrder(data)
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       }
  //     }
  //     getOrderById()
  //   }, [id])

  useEffect(() => {
    setOrderStatus(order.status)
  }, [order])

  // useEffect(() => {
  //   setIds(editCompositMenuValues?.map((value: IProduct) => value.id).toString())
  // }, [compositMenuValues])

  const getEditGeneralInfoValues = (values: initialStateType) => {
    setEditGeneralInfoValues(values)
  }

  //   const getEditCompositMenuValues = (values: IProduct[]) => {
  //     setEditCompositMenuValues(values)
  //   }

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

  //   const [lastName, firstName] = generalInfoValues.name.split(" ")

  //   const order = {
  //     firstName,
  //     lastName,
  //     email: generalInfoValues.email,
  //     phone: generalInfoValues.phone,
  //     status: orderStatus,
  //     deliveryType: generalInfoValues.delivery,
  //     address: generalInfoValues.adress,
  //     paymentType: generalInfoValues.payment,
  //     tth: generalInfoValues.ttn,
  //     comment: generalInfoValues.comment,
  //     productIds: ids,
  //     productCounts: quantities,
  //     total,
  //   }

  const handleSaveChanges = () => {
    console.log("ORDER", order)
    // dispatch(createNewOrder(order))
    setIsClicked(true)
    setTtn("")
    setOrderStatus("pending")
    setEditGeneralInfoValues(initialValues)
  }

  const handleOrderClear = () => {
    setIsClicked(true)
    setTtn("")
    setOrderStatus("pending")
    setEditGeneralInfoValues(initialValues)
  }

  //   console.log("ORDER", order)
  //   console.log("STATUS", orderStatus)
  //   console.log("EDIT", editGeneralInfoValues)

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
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
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
                  //   getEditCompositMenuValues={getEditCompositMenuValues}
                  getQuantities={getQuantities}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  getTotal={getTotal}
                />
              )}
            </div>
            <div className={s.orderBlockToFill__buttons}>
              <button
                type="button"
                className={s.orderBlockToFill__buttons_removeBtn}
                onClick={handleOrderClear}
              >
                ВИДАЛИТИ
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
