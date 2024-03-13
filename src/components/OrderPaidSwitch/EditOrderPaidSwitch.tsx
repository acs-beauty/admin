import React, { useEffect } from "react"
import Switch from "@mui/material/Switch"
import FormGroup from "@mui/material/FormGroup"
import FormControl from "@mui/material/FormControl"
import s from "./OrderPaidSwitch.module.scss"
import { IOrderById } from "src/types/orders"

interface OrderPaidSwitchProps {
  getOrderStatus: (status: boolean) => void
  setFieldValue: (field: string, value: boolean) => void
  order: IOrderById
}

const EditOrderPaidSwitch = ({ getOrderStatus, setFieldValue, order }: OrderPaidSwitchProps) => {
  const [paidChecked, setPaidChecked] = React.useState<boolean>(
    order.status === "pending" ? false : true
  )

  useEffect(() => {
    setPaidChecked(order.status === "pending" ? false : true)
  }, [order.status])

  const handlePaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaidChecked(event.target.checked)
    getOrderStatus(event.target.checked)
    setFieldValue("status", event.target.checked)
  }

  return (
    <div className={s.container}>
      <p className={s.textNotPaid}>Не оплачено</p>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <Switch
            color="primary"
            checked={paidChecked}
            onChange={handlePaidChange}
            sx={{
              width: 84,
              height: 32,
              backgroundColor: paidChecked ? "#948AD0" : "#c3c3c3",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
                transform: "translateX(50px)",
                color: "#7D35DA",
              },
              "& .css-1yjjitx-MuiSwitch-track": {
                visibility: "hidden",
              },
              "& .css-jsexje-MuiSwitch-thumb": {
                width: 24,
                height: 24,
              },
              "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase": {
                padding: "4px",
              },
            }}
          />
        </FormGroup>
      </FormControl>
      <p className={s.textPaid}>Оплачено</p>
    </div>
  )
}

export default EditOrderPaidSwitch
