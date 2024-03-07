import { isAxiosError } from "axios"
import { IErrorRes } from "src/types/users"

export const getErrorObj = (err: unknown): IErrorRes => {
  if (isAxiosError(err)) {
    if (err.response?.data?.message === "Неверный email")
      return { email: "невірний email", password: null }
    if (err.response?.data?.message === "Указан неверный пароль")
      return { email: null, password: "невірний пароль" }
    if (err.response?.data?.message === "Пользователь не активирован")
      return { email: "користувач не активований", password: null }
  }
  return { email: null, password: null }
}
