import AuthForm from "src/components/LoginComponents/AuthForm"
import s from "./Login.module.scss"
import { FormEventHandler, useState } from "react"
import { loginUser } from "src/redux/users/operations"
import { IErrorRes, IUserAuth } from "src/types/users"
import { useAppDispatch } from "src/redux/hooks"
import { useNavigate } from "react-router-dom"
import { getErrorObj } from "./helpers"

const loginFields = [
  { label: "Email", type: "email" as const, placeholder: "Ваша пошта", sx: { mt: "44px" } },
  {
    label: "Пароль",
    type: "password" as const,
    placeholder: "Введіть пароль",
    sx: { mt: "24px" },
  },
]

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<IErrorRes>({
    email: null,
    password: null,
  })

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const userData: IUserAuth = { email: form.email.value, password: form.password.value }
    try {
      await dispatch(loginUser(userData)).unwrap()
      navigate("/")
    } catch (error) {
      setError(getErrorObj(error))
    }
  }
  return (
    <div className={s.LoginPage__container}>
      <div className={s.LoginPage__formWrap}>
        <AuthForm fields={loginFields} onSubmit={onSubmit} error={error} />
      </div>
    </div>
  )
}

export default Login
