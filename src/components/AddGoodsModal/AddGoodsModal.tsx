import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import s from "./AddGoodsModal.module.scss"
import CloseIcon from "src/images/svg/CloseIcon_"
import MagnifyIcon from "src/images/svg/MagnifyIcon"
import { Scrollbars } from "react-custom-scrollbars-2"
import CheckedIcon from "src/images/svg/CheckedIcon"
import { IProduct } from "../OrderCompositMenu/OrderCompositMenu"

const modalRoot = document.querySelector("#modal-root") as HTMLElement

interface IProps {
  onClose: () => void
  getCheckedgoodsIds: (checkedIds: string[]) => void
  goods: IProduct[]
}

const AddGoodsModal = ({ onClose, getCheckedgoodsIds, goods }: IProps) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  const filteredGoods = goods.filter((good: IProduct) =>
    good.name.toLowerCase().includes(searchValue.toLowerCase())
  )

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

  const changeCheckBox = (_id: string, e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) e.stopPropagation()

    const checkBox = document.getElementById(`cbox_${_id}`) as HTMLInputElement
    checkBox.checked = !checkBox.checked

    if (checkBox.checked) {
      setCheckedIds([...checkedIds, _id])
    } else {
      setCheckedIds(checkedIds.filter((id: string) => id !== _id))
    }
  }

  const handleSubmit = () => {
    getCheckedgoodsIds(checkedIds)
    onClose()
  }

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
        <Scrollbars
          style={{ width: 564, height: 390 }}
          renderThumbVertical={props => (
            <div {...props} className={s.scroll__thumb} style={{ width: 8 }} />
          )}
        >
          <ul className={s.modalWindow__list}>
            {filteredGoods.map((good: IProduct) => (
              <li
                className={s.modalWindow__list_item}
                key={good.id}
                onClick={() => changeCheckBox(good.id)}
              >
                <div className={s.modalWindow__list_checkWrapper}>
                  <input
                    type="checkbox"
                    id={`cbox_${good.id}`}
                    className={s.modalWindow__list_itemCheck}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeCheckBox(good.id, e)
                      if (e.target.checked) {
                        setCheckedIds([...checkedIds, good.id])
                      } else {
                        setCheckedIds(checkedIds.filter((id: string) => id !== good.id))
                      }
                    }}
                  />
                  <span className={s.modalWindow__list_checkMark}>
                    <CheckedIcon />
                  </span>
                </div>
                <img src={good.images[0].url} alt="good" className={s.modalWindow__list_itemImg} />
                <div className={s.modalWindow__list_textWrapper}>
                  <p className={s.modalWindow__list_itemTitle}>{good.name}</p>
                  <div className={s.priceWrapper}>
                    <p className={s.modalWindow__list_itemText}>У наявності</p>
                    <p className={s.modalWindow__list_itemText}>{good.price} ₴</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Scrollbars>
        <div className={s.modalWindow__buttonsWrapper}>
          <button className={s.modalWindow__cancelBtn} onClick={onClose}>
            Скасувати
          </button>
          <button className={s.modalWindow__addBtn} onClick={handleSubmit}>
            ДОДАТИ
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default AddGoodsModal
