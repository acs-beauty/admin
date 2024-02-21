import * as Yup from "yup"
import { IProduct } from "src/types/products/IProduct.ts"

export const productFormSchema = Yup.object<IProduct>({
  name: Yup.string()
    .required("Обов`язкове поле")
    .min(3, "Назва має складатися не менше ніж з 3 символів")
    .max(30, "Назва не може перевищувати 30 символів"),
  description: Yup.string()
    .required("Обов`язкове поле")
    .min(3, "Опис має складатися не менше ніж з 3 символів")
    .max(220, "Опис не може перевищувати 220 символи"),
  price: Yup.number()
    .required('Введите цену')
    .typeError('Поле должно быть числом'),
  discount: Yup.number(),
  count: Yup.number(),
  novelty: Yup.boolean(),
  hit: Yup.boolean(),
  subcategoryId: Yup.number(),
  brandId: Yup.number(),
  imageIds: Yup.string(),
  // images: Yup.mixed()
  //   .required("Завантажте банер")
  //   .test(
  //     "fileFormat",
  //     "Дозволено тільки картинки",
  //     value =>
  //       (value instanceof File &&
  //         value.type?.split("/")[0] === "image" &&
  //         value.size <= 3 * 1024 * 1024) ||
  //       (typeof value === "string" && value.startsWith("http"))
  //   ),
})