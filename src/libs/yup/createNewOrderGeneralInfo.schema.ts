import * as Yup from "yup"

export const orderGeneralInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required("Обов`язковий")
    .min(3, "Ім'я має складатися не менше ніж з 3 символів")
    .max(30, "Ім'я не може перевищувати 30 символів")
    .matches(
      /^[a-zа-щьюяіїєґ'-]+$/i,
      "Можна використовувати лише українські та латинські літери, знаки пунктуації, цифри та пробіли"
    ),

  email: Yup.string()
    .matches(
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Пошта повинна бути в форматі mail@mail.com"
    )
    .min(5, "Пошта має складатися не менше ніж з 5 символів")
    .required("Обов`язковий"),

  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Телефон має бути в форматі +380671112233")
    .required("Обов`язковий"),

  adress: Yup.string()
    .required("Обов`язковий")
    .min(3, "Адреса має складатися не менше ніж з 3 символів")
    .max(60, "Адреса не може перевищувати 60 символів"),

  comment: Yup.string()
    .min(3, "Коментар має складатися не менше ніж з 3 символів")
    .max(130, "Коментар не може перевищувати 130 символів"),

  delivery: Yup.string().required("Обов`язковий"),

  payment: Yup.string().required("Обов`язковий"),

  status: Yup.string().required("Обов`язковий"),

  ttn: Yup.string().required("Обов`язковий"),
})
