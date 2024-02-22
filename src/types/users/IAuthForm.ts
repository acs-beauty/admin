import { SxProps } from "@mui/material"
import { FormHTMLAttributes } from "react"

export interface IAuthForm extends FormHTMLAttributes<HTMLFormElement> {
  title: string
  btnTitle: string
  fields: Array<{
    label: string
    type: string
    placeholder: string
    sx?: SxProps
  }>
}
