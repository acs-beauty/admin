import { instance } from "../instance.tsx"
import { IFormData } from "../../types/products/IFormData.ts"

export const productsApi = {
  addProduct(formData: FormData) {
    return instance.post<IFormData>("product/", formData)
  },
}