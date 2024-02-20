import React from "react"
import Switch from "@mui/material/Switch"
import FormGroup from "@mui/material/FormGroup"
// import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import s from "./OrderPaidSwitch.module.scss"

interface OrderPaidSwitchProps {
  getOrderStatus: (status: boolean) => void
  setFieldValue: (field: string, value: boolean) => void
}

const OrderPaidSwitch = ({ getOrderStatus, setFieldValue }: OrderPaidSwitchProps) => {
  const [paidChecked, setPaidChecked] = React.useState<boolean>(false)
  // const [sentChecked, setSentChecked] = React.useState<boolean>(false)

  const handlePaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaidChecked(event.target.checked)
    getOrderStatus(event.target.checked)
    setFieldValue("status", event.target.checked)
  }

  // const handleSentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSentChecked(event.target.checked)
  // }

  return (
    <div className={s.container}>
      <p className={s.textNotPaid}>Не оплачено</p>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          {/* <FormControlLabel
          // value="right"
          sx={{
            // marginLeft: 0,
            // marginRight: "40px",
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              lineHeight: 1.17,
              // marginBottom: "4px",
            },
          }} */}
          {/* control=
        { */}
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
          {/* // } */}
          {/* //   label="Оплачено"
        //   labelPlacement="top"
        // /> */}
          {/* <FormControlLabel
          value="top"
          sx={{
            marginX: 0,
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              lineHeight: 1.17,
              marginBottom: "4px",
            },
          }}
          control={
            <Switch
              color="primary"
              checked={sentChecked}
              onChange={handleSentChange}
              sx={{
                width: 84,
                height: 32,
                backgroundColor: sentChecked ? "#948AD0" : "#c3c3c3",
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
          }
          label="Відправлено"
          labelPlacement="top"
        /> */}
        </FormGroup>
      </FormControl>
      <p className={s.textPaid}>Оплачено</p>
    </div>
  )
}

export default OrderPaidSwitch
