import React from "react"
import { useSelector } from "react-redux"
import { selectNotifications } from "../../../redux/notifications/selectors.tsx"
import { useNavigate } from "react-router-dom"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import RateReviewIcon from "@mui/icons-material/RateReview"
import s from "./NotificationPopup.module.scss"

const NotificationPopup = () => {
  let navigate = useNavigate()
  const notifications = useSelector(selectNotifications)

  const unreadItems = notifications.filter(item => item.status === "unread")

  const handleClickItem = (event: React.MouseEvent<HTMLElement>, item: any) => {
    if (item.contentType === "order") {
      navigate("/orders")
    } else if (item.contentType === "feedback") {
      navigate("/reviews")
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span> У ВАС {unreadItems.length} НОВИХ СПОВІЩЕНЬ </span>
      </div>
      <ul>
        {unreadItems.map(item => (
          <li key={item.id} onClick={e => handleClickItem(e, item)}>
            {item.contentType === "order" ? (
              <ShoppingBasketIcon className={s.icon} />
            ) : (
              <RateReviewIcon className={s.icon} />
            )}
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationPopup
