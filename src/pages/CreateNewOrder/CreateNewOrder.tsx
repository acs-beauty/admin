import React, { useEffect, useState } from "react"
import AdminLayout from "src/layouts/AdminLayout"
import s from "./CreateNewOrder.module.scss"
import ArrowToLeft from "src/images/svg/ArrowToLeft"
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon"
import GeneralInfoMenu from "src/components/GeneralInfoMenu/GeneralInfoMenu"
import ArrowToTopFlatIcon from "src/images/svg/ArrowToTopFlatIcon"
import OrderCompositMenu, { IProduct } from "src/components/OrderCompositMenu/OrderCompositMenu"
import { initialStateType } from "../../components/GeneralInfoMenu/GeneralInfoMenu"
import { useAppDispatch } from "src/redux/hooks"
import { createNewOrder } from "src/redux/orders/operations"

const CreateNewOrder = () => {
  const [isGeneralInfoMenuOpen, setIsGeneralInfoMenuOpen] = useState<boolean>(true)
  const [isOrderCompositMenuOpen, setIsOrderCompositMenuOpen] = useState<boolean>(true)
  const [orderStatus, setOrderStatus] = useState<string>("pending")
  const [ttn, setTtn] = useState<string>("")
  const [ids, setIds] = useState<string>("")
  const [quantities, setQuantities] = useState<string>("")
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

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

  const [generalInfoValues, setGeneralInfoValues] = useState<initialStateType>(initialValues)
  const [compositMenuValues, setCompositMenuValues] = useState<IProduct[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    setIds(compositMenuValues?.map((value: IProduct) => value.id).toString())
  }, [compositMenuValues])

  const getGeneralInfoValues = (values: initialStateType) => {
    setGeneralInfoValues(values)
  }

  const getCompositMenuValues = (values: IProduct[]) => {
    setCompositMenuValues(values)
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

  const [lastName, firstName] = generalInfoValues.name.split(" ")

  const order = {
    firstName,
    lastName,
    email: generalInfoValues.email,
    phone: generalInfoValues.phone,
    status: orderStatus,
    deliveryType: generalInfoValues.delivery,
    address: generalInfoValues.adress,
    paymentType: generalInfoValues.payment,
    tth: ttn,
    comment: generalInfoValues.comment,
    productIds: ids,
    productCounts: quantities,
    total,
  }

  const handleSaveChanges = () => {
    dispatch(createNewOrder(order))
    setIsClicked(true)
    setTtn("")
    setOrderStatus("pending")
    setGeneralInfoValues(initialValues)
  }

  const handleOrderClear = () => {
    setIsClicked(true)
    setTtn("")
    setOrderStatus("pending")
    setGeneralInfoValues(initialValues)
  }

  const date = new Date(Date.now()).toLocaleDateString()

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__section_titleWrapper}>
            <ArrowToLeft />
            <p className={s.main__section_titleText}>Створити нове замовлення</p>
          </div>
          <div className={s.createdNewOrderDetails}>
            <div>
              <p className={s.createdNewOrderDetails__info_text}>Дата створення: {date}</p>
              <p className={s.createdNewOrderDetails__info_text}>
                Статус замовлення: {orderStatus}
              </p>
              <p className={s.createdNewOrderDetails__info_text}>ТТН: {ttn}</p>
            </div>
          </div>
          <div className={s.orderBlockToFill}>
            <div className={s.orderBlockToFill__list}>
              <div
                className={s.orderBlockToFill__list_item}
                onClick={() => setIsGeneralInfoMenuOpen(!isGeneralInfoMenuOpen)}
              >
                <p className={s.list_itemText}>Основна інформація</p>
                {isGeneralInfoMenuOpen ? (
                  <ArrowToTopFlatIcon size={32} />
                ) : (
                  <ArrowToBottomIcon size={32} />
                )}
              </div>
              {isGeneralInfoMenuOpen && (
                <GeneralInfoMenu
                  getOrderStatus={getOrderStatus}
                  getTtn={getTtn}
                  getGeneralInfoValues={getGeneralInfoValues}
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
                <OrderCompositMenu
                  getCompositMenuValues={getCompositMenuValues}
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

export default CreateNewOrder
