import { ChangeEvent, FC, useEffect, useState } from "react"
import { Box, TextField, Typography } from "@mui/material"
import VioletButton from "src/components/Buttons/VioletButton"
import { IAuthForm } from "src/types/users"

const AuthForm: FC<IAuthForm> = ({ fields, onSubmit, error, values, setValues }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    for (const value of Object.values(values)) {
      if (value === "") {
        setIsDisabled(true)
        return
      }
    }
    setIsDisabled(false)
  }, [values])

  return (
    <>
      <Typography variant="h1" fontSize="20px" fontWeight="500" color="#5C5E60" align="center">
        ВХІД ДО АДМІНПАНЕЛІ
      </Typography>
      <Box
        component="form"
        sx={{
          width: "338px",
          "& .MuiFormLabel-root": { color: "#5c5e60" },
          "& .MuiTextField-root fieldset": {
            border: "1px solid #00000019",
          },
          "& .MuiInputBase-input": {
            px: "16px",
          },
        }}
        onSubmit={onSubmit}
      >
        {fields.map(({ label, type, placeholder, sx }) => (
          <TextField
            key={type}
            InputLabelProps={{
              shrink: true,
            }}
            id={type}
            value={values[type]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues(prevState => ({ ...prevState, [type]: e.target.value }))
            }
            name={type}
            label={label}
            type={type}
            placeholder={placeholder}
            sx={sx}
            fullWidth
            error={error[type] ? true : false}
            helperText={error[type]}
          />
        ))}
        <VioletButton
          type="submit"
          title="УВІЙТИ"
          disabled={isDisabled}
          style={{ width: "100%", marginTop: "44px", fontSize: "20px", lineHeight: "23.44px" }}
        />
      </Box>
    </>
  )
}

export default AuthForm
