import AuthForm from "src/components/LoginComponents/AuthForm"
import s from "./Login.module.scss"
import { FormEventHandler } from "react"
import { loginUser } from "src/redux/users/operations"
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

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const userData: IUserAuth = { email: form.email.value, password: form.password.value }
    try {
      await dispatch(loginUser(userData)).unwrap()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={s.LoginPage__container}>
      <div className={s.LoginPage__formWrap}>
        <AuthForm
          title="ВХІД ДО АДМІНПАНЕЛІ"
          btnTitle="УВІЙТИ"
          fields={loginFields}
          onSubmit={onSubmit}
        />
        <Link to="/register" className={s.LoginPage__link}>
          Зареєструватись
        </Link>
      </div>
    </div>
  )
}

export default Login
