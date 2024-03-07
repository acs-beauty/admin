import { IRootState } from "../store"

export const selectUserIsAuth = (state: IRootState) => state.user.isAuth
