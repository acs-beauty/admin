import { createAsyncThunk } from "@reduxjs/toolkit"
import { IRootState } from "../store"
import { productsApi } from "../../api/products/productsApi.ts"
import { IFormData } from "../../types/products/IFormData.ts"

const createProductsAsyncThunk = createAsyncThunk.withTypes<{
  state: IRootState
  rejectValue: unknown
}>()

export const createNewProduct = createProductsAsyncThunk<IFormData, FormData>(
  "products/createNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await productsApi.addProduct(formData)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)