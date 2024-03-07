import { SxProps } from "@mui/material"
import { Dispatch, FormEventHandler, SetStateAction } from "react"
import { IErrorRes } from "./IErrorRes"
import { IFormValues } from "./IFormValues"

export interface IAuthForm {
  fields: Array<{
    label: string
    type: "email" | "password"
    placeholder: string
    sx?: SxProps
  }>
  values: IFormValues
  setValues: Dispatch<SetStateAction<IFormValues>>
  onSubmit: FormEventHandler<HTMLFormElement>
  error: IErrorRes
}
