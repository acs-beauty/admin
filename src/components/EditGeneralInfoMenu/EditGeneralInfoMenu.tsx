import React, { useEffect, useRef, useState } from "react"
import s from "./EditGeneralInfoMenu.module.scss"
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik"
import { orderGeneralInfoSchema } from "../../libs/yup/createNewOrderGeneralInfo.schema"
import UserIcon from "src/images/svg/UserIcon"
import EmailIcon from "src/images/svg/EmailIcon"
import PhoneIcon from "src/images/svg/PhoneIcon"
import MapMarkerIcon from "src/images/svg/MapMarkerIcon"
import DeliveryIcon from "src/images/svg/DeliveryIcon"
import CreditCardIcon from "src/images/svg/CreditCardIcon"
import CommentIcon from "src/images/svg/CommentIcon"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EditOrderPaidSwitch from "../OrderPaidSwitch/EditOrderPaidSwitch"
import { useSelector } from "react-redux"
import { selectOrder } from "src/redux/orders/selectors"

export interface initialStateType {
  name: string
  email: string
  phone: string
  adress: string
  delivery: string
  payment: string
  comment: string
  status: boolean
  ttn: string
}

interface GeneralInfoMenuProps {
  getOrderStatus: (status: boolean) => void
  getTtn: (ttn: string) => void
  getEditGeneralInfoValues: (values: initialStateType) => void
  isClicked: boolean
  setIsClicked: (value: boolean) => void
}

const EditGeneralInfoMenu = ({
  getOrderStatus,
  getTtn,
  getEditGeneralInfoValues,
  isClicked,
  setIsClicked,
}: GeneralInfoMenuProps) => {
  const order = useSelector(selectOrder)
  console.log("ORDER", order)

  const [delivery, setDelivery] = useState<string>("")
  const [payment, setPayment] = useState<string>("")
  const [comment, setComment] = useState<string>("")

  const formikRef = useRef<FormikProps<initialStateType>>(null)

  const initialValues: initialStateType = {
    name: order.lastName + " " + order.firstName,
    email: order.email,
    phone: order.phone,
    adress: order.address,
    delivery: order.deliveryType,
    payment: order.paymentType,
    comment: order.comment,
    status: order.status === "pending" ? false : true,
    ttn: order.tth,
  }

  useEffect(() => {
    setDelivery(order.deliveryType)
    setPayment(order.paymentType)
    setComment(order.comment)
  }, [order])

  useEffect(() => {
    if (isClicked) {
      formikRef.current?.resetForm()
      setDelivery("")
      setPayment("")
      setComment("")
      setIsClicked(false)
    }
  }, [isClicked, setIsClicked])

  const handleSubmit = (values: initialStateType) => {
    console.log("VALUES", values)
    getTtn(values.ttn)
    getEditGeneralInfoValues(values)
    toast.success("Дані успішно збережено")
  }

  return (
    order.email !== "" && (
      <div className={s.generalInfoMenu__container}>
        <Formik
          initialValues={initialValues}
          validationSchema={orderGeneralInfoSchema}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          {({ setFieldValue }) => (
            <Form>
              <div>
                <div className={s.generalInfoMenuForm__wrapper}>
                  <div>
                    <p className={s.generalInfoMenuForm__title}>Клієнт</p>
                    <div className={s.generalInfoMenuForm__input_wrapper}>
                      <Field
                        name="name"
                        placeholder="ПІП Клієнта"
                        className={s.generalInfoMenuForm__input}
                      />
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="name" />
                      </div>
                      <div className={s.generalInfoMenuForm__icon}>
                        <UserIcon />
                      </div>
                    </div>
                    <div className={s.generalInfoMenuForm__input_wrapper}>
                      <Field
                        name="email"
                        placeholder="Email"
                        className={s.generalInfoMenuForm__input}
                      />
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="email" />
                      </div>
                      <div className={s.generalInfoMenuForm__icon}>
                        <EmailIcon />
                      </div>
                    </div>
                    <div className={s.generalInfoMenuForm__input_wrapper}>
                      <Field
                        name="phone"
                        placeholder="Номер телефону"
                        className={s.generalInfoMenuForm__input}
                      />
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="phone" />
                      </div>
                      <div className={s.generalInfoMenuForm__icon}>
                        <PhoneIcon />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className={s.generalInfoMenuForm__title}>Доставка та оплата</p>
                    <div className={s.generalInfoMenuForm__select_wrapper}>
                      <Field
                        as="select"
                        name="delivery"
                        className={s.generalInfoMenuForm__input}
                        value={delivery}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setDelivery(e.target.value)
                          setFieldValue("delivery", e.target.value)
                        }}
                      >
                        <option value="" hidden>
                          Спосіб доставки
                        </option>
                        <option value="ukrPoshta">Укрпошта</option>
                        <option value="novaPoshta">Нова Пошта</option>
                        <option value="selfDelivery">Самовивіз</option>
                      </Field>
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="delivery" />
                      </div>
                      <div className={s.generalInfoMenuForm__icon}>
                        <DeliveryIcon />
                      </div>
                    </div>
                    <div className={s.generalInfoMenuForm__select_wrapper}>
                      <Field
                        as="select"
                        name="payment"
                        className={s.generalInfoMenuForm__input}
                        value={payment}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setPayment(e.target.value)
                          setFieldValue("payment", e.target.value)
                        }}
                      >
                        <option value="" hidden>
                          Спосіб оплати
                        </option>
                        <option value="cash">Оплата готівкою</option>
                        <option value="card">Оплата на картку</option>
                      </Field>
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="payment" />
                      </div>
                      <div className={s.generalInfoMenuForm__icon}>
                        <CreditCardIcon />
                      </div>
                    </div>
                    <div className={s.generalInfoMenuForm__input_wrapper}>
                      <Field
                        name="adress"
                        placeholder="Адреси"
                        className={s.generalInfoMenuForm__input}
                      />
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="adress" />
                      </div>
                      <div className={s.generalInfoMenuForm__icon}>
                        <MapMarkerIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.generalInfoMenuForm__input_wrapper}>
                  <Field
                    as="textarea"
                    name="comment"
                    placeholder="Коментар"
                    className={s.generalInfoMenuForm__textarea}
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setComment(e.target.value)
                      setFieldValue("comment", e.target.value)
                    }}
                  />
                  <div className={s.generalInfoMenuForm__errors}>
                    <ErrorMessage name="comment" />
                  </div>
                  <div className={s.generalInfoMenuForm__icon}>
                    <CommentIcon />
                  </div>
                </div>
                <div className={s.generalInfoMenuForm__wrapper}>
                  <div>
                    <p className={s.generalInfoMenuForm__title_paidStatus}>Статус замовлення</p>
                    <EditOrderPaidSwitch
                      getOrderStatus={getOrderStatus}
                      setFieldValue={setFieldValue}
                      isClicked={isClicked}
                      setIsClicked={setIsClicked}
                      order={order}
                    />
                  </div>
                  <div>
                    <p className={s.generalInfoMenuForm__title}>Додати ТТН</p>
                    <div className={s.generalInfoMenuForm__ttnInput_wrapper}>
                      <Field name="ttn" className={s.generalInfoMenuForm__input_ttn} />
                      <div className={s.generalInfoMenuForm__errors}>
                        <ErrorMessage name="ttn" />
                      </div>
                      <button type="submit" className={s.generalInfoMenuForm__submitBtn}>
                        ЗБЕРЕГТИ
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  )
}

export default EditGeneralInfoMenu
