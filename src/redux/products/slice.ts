import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewProduct,
} from "./operations";
import { IFormData } from "../../types/products/IFormData.ts"

export interface IState {
  products: IFormData[];
  isLoading: boolean;
  error: unknown | null;
}

const initialState: IState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    addBrand: (state, action: PayloadAction<IFormData>) => {
      state.products.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, handlePending)
      .addCase(createNewProduct.fulfilled, (state, action) => {
        productsSlice.caseReducers.addBrand(state, action);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createNewProduct.rejected, handleRejected)

  },
});

function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true;
}

function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false;
  state.error = action.payload;
}

export const productsReducer = productsSlice.reducer;