import ReactDOM from "react-dom"
import { ReactNode, useCallback, useEffect } from "react"
import s from "./ModalPortal.module.scss"
import CloseIcon from "../../images/svg/CloseIcon_.tsx"

interface ModalProps {
  children: ReactNode
  close: () => void
  showCloseButton?: boolean
}

const rootModal = document.querySelector("#modal")
const modalContainer = rootModal?.appendChild(document.createElement("div"))

if (!modalContainer) {
  throw new Error("Modal container not found")
}

const ModalPortal: React.FC<ModalProps> = ({ children, close, showCloseButton }) => {
  const handleKeyDown: any = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      }
    },
    [close]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "visible"
    }
  }, [close, handleKeyDown])

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  return ReactDOM.createPortal(
    <div className={s.wrapper} onClick={handleClickOutside}>
      <div className={s.content}>
        {showCloseButton && (
          <button className={s.closeButton} onClick={close}>
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>,
    modalContainer
  )
}

export default ModalPortal
