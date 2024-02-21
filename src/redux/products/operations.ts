import { createAsyncThunk } from "@reduxjs/toolkit"
import { productsApi } from "src/api/products/ProductsApi"
import { IProductResponse, IGetProductsParams } from "src/types/products"

export const getProducts = createAsyncThunk<IProductResponse, IGetProductsParams>(
  "products/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await productsApi.getProducts(params)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
