import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import s from "./AddGoodsModal.module.scss"
import CloseIcon from "src/images/svg/CloseIcon_"
import CheckedIcon from "../../images/svg/CheckedIcon"
import { IProduct } from "../OrderCompositMenu/OrderCompositMenu"
import { instance } from "../../api/instance"
import SearchInput from "../ToolsPanel/SearchInput/SearchInput"
import InfiniteScroll from "react-infinite-scroll-component"

const modalRoot = document.querySelector("#modal-root") as HTMLElement

interface IProps {
  onClose: () => void
  getGoods: (arrayToRender: IProduct[]) => void
  getCompositMenuValues: (values: IProduct[]) => void
}

interface IProductResponse {
  count: number
  rows: IProduct[]
}

const AddGoodsModal = ({ onClose, getGoods, getCompositMenuValues }: IProps) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [goods, setGoods] = useState<IProduct[]>([])
  const [foundCheckedGoods, setFoundCheckedGoods] = useState<IProduct[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  useEffect(() => {
    getProducts()
  }, [page, searchValue])

  const getProducts = async () => {
    setIsLoading(true)

    try {
      const { data } = await instance.get<IProductResponse>(
        `product?page=${page}&pageSize=25&lookup=${searchValue}`
      )

      console.log("COUNT", Math.ceil(data.count / 25))

      if (page === Math.ceil(data.count / 25)) {
        setHasMore(false)
      }

      setGoods([...goods, ...data.rows])
    } catch (error: unknown) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  // const handleScroll = () => {
  //   const container = containerRef.current

  //   console.log("scrollTop", container?.scrollTop)
  //   console.log("clientHeight", container?.clientHeight)
  //   console.log("scrollHeight", container?.scrollHeight)

  //   if (container) {
  //     const isAtBottom = container.scrollTop + container.clientHeight === container.scrollHeight

  //     if (isAtBottom && !isLoading) {
  //       setPage(prevPage => prevPage + 1)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   const container = containerRef.current

  //   if (container) {
  //     container.addEventListener("scroll", handleScroll)
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener("scroll", handleScroll)
  //     }
  //   }
  // }, [])

  useEffect(() => {
    const foundGoods: (IProduct | undefined)[] = checkedIds.map((goodId: string) =>
      goods.find(good => good?.id === goodId)
    )

    const existGoods: IProduct[] = foundGoods.filter(good => good !== undefined) as IProduct[]

    setFoundCheckedGoods(existGoods)
  }, [checkedIds, goods])

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
    getGoods(foundCheckedGoods)
    getCompositMenuValues(foundCheckedGoods)
    onClose()
  }

  const handleSearch = (value: string) => {
    setGoods([])
    setPage(1)
    setSearchValue(value)
  }

  console.log("PAGE", page)
  console.log("GOODS", goods.length)
  console.log("HASMORE", hasMore)

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modalWindow}>
        <h3 className={s.modalWindow__title}>ДОДАТИ ТОВАР</h3>
        <div className={s.modalWindow__closeIconWrapper}>
          <CloseIcon onClick={onClose} />
        </div>
        <SearchInput onChange={handleSearch} />
        <div className={s.modalWindow__listAndBtnsWrapper}>
          <div
            id="scrollableDiv"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InfiniteScroll
              dataLength={goods.length}
              next={handleNextPage}
              hasMore={hasMore}
              loader={<span></span>}
              height={400}
            >
              <ul className={s.modalWindow__list}>
                {goods.map((good: IProduct, index) => (
                  <li
                    className={s.modalWindow__list_item}
                    key={index}
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
                    <img
                      src={good.images[0].url}
                      alt="good"
                      className={s.modalWindow__list_itemImg}
                    />
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
            </InfiniteScroll>
          </div>
          {isLoading && <p>Loading...</p>}
          <div className={s.modalWindow__buttonsWrapper}>
            <div>
              <button className={s.modalWindow__cancelBtn} onClick={onClose}>
                Скасувати
              </button>
              <button className={s.modalWindow__addBtn} onClick={handleSubmit}>
                ДОДАТИ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default AddGoodsModal
