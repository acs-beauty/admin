import React from "react"
import { useAppDispatch } from "src/redux/hooks"
import s from "./Notifications.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import NotificationsTabs from "../../components/NotificationsComponents/NotificationsTabs/NotificationsTabs.tsx"

const Notifications: React.FC = () => {

  const dispatch = useAppDispatch()
  // const [isOpenModal, setIsOpenModal] = useState(false)
  //
  // const [page, setPage] = useState(0)
  // const [pageSize, setPageSize] = useState(10)
  // const [searchName, setSearchName] = useState("")
  //
  // useEffect(() => {
  //   dispatch(
  //     getBrands({
  //       lookup: searchName,
  //       pageSize,
  //       page: page + 1,
  //     })
  //   )
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, pageSize, searchName])

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