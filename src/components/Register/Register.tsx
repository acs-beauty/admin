import AuthForm from "src/components/LoginComponents/AuthForm"
import s from "./Register.module.scss"
import { FormEventHandler } from "react"
import { registerUser } from "src/redux/users/operations"
import { IUserAuth } from "src/types/users"
import { useAppDispatch } from "src/redux/hooks"
import { Link, useNavigate } from "react-router-dom"

const loginFields = [
  { label: "Email", type: "email", placeholder: "Ваша пошта", sx: { mt: "44px" } },
  {
    label: "Пароль",
    type: "password",
    placeholder: "Введіть пароль",
    sx: { mt: "24px" },
  },
]

const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const userData: IUserAuth = { email: form.email.value, password: form.password.value }
    try {
      await dispatch(registerUser(userData)).unwrap()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={s.RegisterPage__container}>
      <div className={s.RegisterPage__formWrap}>
        <AuthForm
          title="РЕЄСТРАЦІЯ"
          btnTitle="ЗАРЕЄСТРУВАТИСЯ"
          fields={loginFields}
          onSubmit={onSubmit}
        />
        <Link to="/login" className={s.RegisterPage__link}>
          Увійти
        </Link>
      </div>
    </div>
  )
}

export default Register
