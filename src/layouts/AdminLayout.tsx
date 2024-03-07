import s from "./AdminLayout.module.scss"
import NoticesIcon from "src/images/svg/NoticesIcon"
import AccountIcon from "src/images/svg/AccountIcon"

import Sidebar from "src/components/Sidebar/Sidebar"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "src/redux/hooks"
import { selectUserIsAuth } from "src/redux/users/selectors"

const AdminLayout = () => {
  const location = useLocation()
  const isAuth = useAppSelector(selectUserIsAuth)

  return (
    <>
      <header className={s.header}>
        <div className={s.header__container}>
          <div className={s.header__logo}>
            <h1 className={s.logo}>ACS Beauty</h1>
          </div>
          <div className={s.header__body}>
            <div className={s.icon}>
              <NoticesIcon />
            </div>
            <div className={s.icon}>
              <AccountIcon />
            </div>
          </div>
        </div>
        <div className={s.sidebar}>
          <Sidebar />
        </div>
      </header>
      {isAuth ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />}
    </>
  )
}
export default AdminLayout
