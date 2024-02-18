import React from "react"
import s from "./AdminLayout.module.scss"
import NoticesIcon from "src/images/svg/NoticesIcon"
import AccountIcon from "src/images/svg/AccountIcon"

import Sidebar from "src/components/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
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
      <Outlet />
    </>
  )
}
export default AdminLayout
