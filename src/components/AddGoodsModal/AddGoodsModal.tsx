import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import s from "./AddGoodsModal.module.scss"
import CloseIcon from "src/images/svg/CloseIcon_"
import { goods } from "../OrderCompositMenu/goods"
import MagnifyIcon from "src/images/svg/MagnifyIcon"

const modalRoot = document.querySelector("#modal-root") as HTMLElement

interface IProps {
  onClose: () => void
}

interface IGood {
  id: string
  photoUrl: string
  title: string
  goodId: string
  quantity: string
  price: string
  discount: string
  total: string
}

const AddGoodsModal = ({ onClose }: IProps) => {
  const [searchValue, setSearchValue] = useState<string>("")

  const filteredGoods = goods.filter((good: IGood) => good.title.includes(searchValue))

  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose()
    }

    window.addEventListener("keydown", onEscClick)

    return () => {
      window.removeEventListener("keydown", onEscClick)
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) onClose()
  }

  //   const handleSubmit = () => {
  //     onSubmit(values)
  //     onClose()
  //   }

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modalWindow}>
        <h3 className={s.modalWindow__title}>ДОДАТИ ТОВАР</h3>
        <div className={s.modalWindow__closeIconWrapper}>
          <CloseIcon onClick={onClose} />
        </div>
        <div className={s.modalWindow__searchInput_wrapper}>
          <input
            className={s.modalWindow__searchInput}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value)
            }}
          />
          <div className={s.modalWindow__searchInput_icon}>
            <MagnifyIcon />
          </div>
        </div>
        <ul className={s.modalWindow__list}>
          {filteredGoods.map((good: IGood) => (
            <li className={s.modalWindow__list_item} key={good.id}>
              <input type="checkbox" className={s.modalWindow__list_itemCheck} />
              <img src={good.photoUrl} alt="good" className={s.modalWindow__list_itemImg} />
              <div>
                <p className={s.modalWindow__list_itemTitle}>{good.title}</p>
                <div className={s.priceWrapper}>
                  <p className={s.modalWindow__list_itemText}>У наявності</p>
                  <p className={s.modalWindow__list_itemText}>{good.price} ₴</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={s.modalWindow__buttonsWrapper}>
          <button className={s.modalWindow__cancelBtn}>Скасувати</button>
          <button className={s.modalWindow__addBtn}>ДОДАТИ</button>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default AddGoodsModal
