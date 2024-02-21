import { IRootState } from "../store"

export const selectCount = (state: IRootState) => state.products.count
export const selectProducts = (state: IRootState) => state.products.products
export const selectError = (state: IRootState) => state.products.error
export const selectIsLoading = (state: IRootState) => state.products.isLoading
