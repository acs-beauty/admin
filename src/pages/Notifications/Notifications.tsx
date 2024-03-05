import React from "react"
import s from "./Notifications.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import NotificationsTabs from "../../components/NotificationsComponents/NotificationsTabs/NotificationsTabs.tsx"

const Notifications: React.FC = () => {
  return (
    <AdminLayout>
      <main className={s.notification}>
        <section className={s.notification__section}>
          <div className={s.notification__title}>
            <h2 className={s.notification__title_text}>Сповіщення</h2>
          </div>
          <NotificationsTabs />
        </section>
      </main>
    </AdminLayout>
  )
}

export default Notifications
