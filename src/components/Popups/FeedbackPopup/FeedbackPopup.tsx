import React from "react"
import styles from "./FeedbackPopup.module.scss"
import VioletButton from "../../Buttons/VioletButton/VioletButton"
import { useNavigate } from "react-router-dom"

interface IProps {
  close: () => void
}
const FeedbackPopup: React.FC<IProps> = ({ close }) => {
  let navigate = useNavigate()
  const handleSubmit = () => {
    navigate("/orders")
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div></div>
        <h3>ДОДАТИ ВІДГУК</h3>
      </div>
      <div className={styles.feedback__content}>
        <div className={styles.title}>Новий відгук від Колесник М.</div>
        <div className={styles.description}>
          Продукція компанії “” відповідає заявленим характеристикам. Вона є якісною та відповідає
          потребам споживачів.
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.buttons}>
          <div className={styles.whiteButton}>
            <button onClick={close}>Відхилити</button>
          </div>
          <VioletButton
            className={styles.violetButton}
            onClick={handleSubmit}
            title={"Опублікувати"}
          />
        </div>
      </div>
    </div>
  )
}

export default FeedbackPopup
