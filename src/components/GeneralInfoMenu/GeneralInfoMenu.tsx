import React, { useState } from "react"
import s from "./GeneralInfoMenu.module.scss"
import { Formik, Form, Field, ErrorMessage, FormikState } from "formik"
import { orderGeneralInfoSchema } from "../../libs/yup/createNewOrderGeneralInfo.schema"

interface initialStateType {
  name: string
  email: string
  phone: string
  adress: string
  delivery: string
  payment: string
  comment: string
  status: string
  ttn: string
}

interface ResetFormProps {
  resetForm: (nextState?: Partial<FormikState<initialStateType>>) => void
}

const GeneralInfoMenu = () => {
  const [delivery, setDelivery] = useState<string>("")
  const [payment, setPayment] = useState<string>("")
  const [comment, setComment] = useState<string>("")

  const initialValues: initialStateType = {
    name: "",
    email: "",
    phone: "",
    adress: "",
    delivery: "",
    payment: "",
    comment: "",
    status: "",
    ttn: "",
  }

  const handleSubmit = (values: initialStateType, { resetForm }: ResetFormProps) => {
    console.log("VALUES", values)
    resetForm()
    setDelivery("")
    setPayment("")
    setComment("")
  }

  return (
    <div className={s.generalInfoMenu__container}>
      <Formik
        initialValues={initialValues}
        validationSchema={orderGeneralInfoSchema}
        onSubmit={handleSubmit}
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
                      placeholder="ПІП клієнта"
                      className={s.generalInfoMenuForm__input}
                    />
                    <div className={s.generalInfoMenuForm__errors}>
                      <ErrorMessage name="name" />
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
                  </div>
                  <div className={s.generalInfoMenuForm__input_wrapper}>
                    <Field
                      name="adress"
                      placeholder="Адреси"
                      className={s.generalInfoMenuForm__input_adress}
                    />
                    <div className={s.generalInfoMenuForm__errors}>
                      <ErrorMessage name="adress" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className={s.generalInfoMenuForm__title}>Доставка та оплата</p>
                  <div className={s.generalInfoMenuForm__input_wrapper}>
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
                      <option value="ukrposhta">Укрпошта</option>
                      <option value="novaposhta">Нова Пошта</option>
                      <option value="courier">Кур'єр</option>
                    </Field>
                    <div className={s.generalInfoMenuForm__errors}>
                      <ErrorMessage name="delivery" />
                    </div>
                  </div>
                  <div className={s.generalInfoMenuForm__input_wrapper}>
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
                      <option value="rakhunok">Оплата на розрахунковий рахунок</option>
                      <option value="kartka">Оплата на картку</option>
                      <option value="otrymanni">Оплата при отриманні</option>
                    </Field>
                    <div className={s.generalInfoMenuForm__errors}>
                      <ErrorMessage name="payment" />
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
                  </div>
                </div>
              </div>
              <div className={s.generalInfoMenuForm__wrapper}>
                <div>
                  <p className={s.generalInfoMenuForm__title}>Статус замовлення</p>
                  <div className={s.generalInfoMenuForm__input_wrapper}>
                    <Field
                      as="select"
                      name="status"
                      className={s.generalInfoMenuForm__input_status}
                      value={delivery}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setDelivery(e.target.value)
                        setFieldValue("status", e.target.value)
                      }}
                    >
                      <option value="" hidden></option>
                      <option value="new">Нове</option>
                      <option value="accepted">Прийнято</option>
                      <option value="paid">Оплачено</option>
                      <option value="done">Виконано</option>
                      <option value="canceled">Скасовано</option>
                    </Field>
                    <div className={s.generalInfoMenuForm__errors}>
                      <ErrorMessage name="status" />
                    </div>
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default GeneralInfoMenu
