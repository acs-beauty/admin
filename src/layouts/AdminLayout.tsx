import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectNotifications } from "../redux/notifications/selectors.tsx"
import Sidebar from "src/components/Sidebar/Sidebar"
import NotificationPopup from "../components/Popups/NotificationPopup/NotificationPopup.js"
import ModalPortal from "../components/ModalPortal/ModalPortal.tsx"
import NoticesIcon from "src/images/svg/NoticesIcon"
import AccountIcon from "src/images/svg/AccountIcon"
import s from "./AdminLayout.module.scss"
import classNames from "classnames"

interface Props {
  children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [notificationPopupVisible, setNotificationPopupVisible] = useState(false)
  const notifications = useSelector(selectNotifications)

  const toggleNotificationPopup = () => {
    setNotificationPopupVisible(!notificationPopupVisible)
  }

  const closeModal = () => {
    setNotificationPopupVisible(false)
  }

  const unreadItems = notifications.filter(item => item.status === "unread")

  return (
    <>
      <div>
        <header className={s.header}>
          <div className={s.header__container}>
            <div className={s.header__logo}>
              <h1 className={s.logo}>ACS Beauty</h1>
            </div>
            <div className={s.header__body}>
              <div className={s.icon} onClick={toggleNotificationPopup}>
                <div className={classNames(unreadItems.length ? s.icon__notice : null)}>
                  <NoticesIcon color={"white"} />
                </div>
                {notificationPopupVisible && (
                  <ModalPortal close={closeModal} showCloseButton={false}>
                    <div className={s.popup}>
                      <NotificationPopup />
                    </div>
                  </ModalPortal>
                )}
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
      </div>

      <div>{children}</div>
    </>
  )
}
export default AdminLayout
