import { SxProps } from "@mui/material"
import { FormEventHandler } from "react"
import { IErrorRes } from "./IErrorRes"

export interface IAuthForm {
  fields: Array<{
    label: string
    type: "email" | "password"
    placeholder: string
    sx?: SxProps
  }>
  onSubmit: FormEventHandler<HTMLFormElement>
  error: IErrorRes
}
