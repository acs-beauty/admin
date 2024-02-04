import React, { useState } from "react"
import AdminLayout from "src/layouts/AdminLayout"
import s from "./CreateNewOrder.module.scss"
import CreateNewOrderSwitch from "src/components/CreateNewOrderSwitch/CreateNewOrderSwitch"
import ArrowToLeft from "src/images/svg/ArrowToLeft"
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon"
import GeneralInfoMenu from "src/components/GeneralInfoMenu/GeneralInfoMenu"
import ArrowToTopFlatIcon from "src/images/svg/ArrowToTopFlatIcon"

const CreateNewOrder = () => {
  const [isGeneralInfoMenuOpen, setIsGeneralInfoMenuOpen] = useState<boolean>(false)
  const [isOrderCompositMenuOpen, setIsOrderCompositMenuOpen] = useState<boolean>(false)
  const [isOrderHistoryMenuOpen, setIsOrderHistoryMenuOpen] = useState<boolean>(false)

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__section_titleWrapper}>
            <ArrowToLeft />
            <p className={s.main__section_titleText}>Створити нове замовлення</p>
          </div>
          <div className={s.createdNewOrderDetails}>
            <div>
              <p className={s.createdNewOrderDetails__info_text}>Дата створення:</p>
              <p className={s.createdNewOrderDetails__info_text}>Статус замовлення:</p>
              <p className={s.createdNewOrderDetails__info_text}>ТТН:</p>
            </div>
            <div>
              <CreateNewOrderSwitch />
            </div>
          </div>
          <div className={s.orderBlockToFill}>
            <div className={s.orderBlockToFill__list}>
              <div
                className={s.orderBlockToFill__list_item}
                onClick={() => setIsGeneralInfoMenuOpen(!isGeneralInfoMenuOpen)}
              >
                <p className={s.list_itemText}>Основна інформація</p>
                {isGeneralInfoMenuOpen ? (
                  <ArrowToTopFlatIcon size={32} />
                ) : (
                  <ArrowToBottomIcon size={32} />
                )}
              </div>
              {isGeneralInfoMenuOpen && <GeneralInfoMenu />}
              <div
                className={s.orderBlockToFill__list_item}
                onClick={() => setIsOrderCompositMenuOpen(!isOrderCompositMenuOpen)}
              >
                <p className={s.list_itemText}>Склад замовлення</p>
                {isOrderCompositMenuOpen ? (
                  <ArrowToTopFlatIcon size={32} />
                ) : (
                  <ArrowToBottomIcon size={32} />
                )}
              </div>
              {isOrderCompositMenuOpen && <GeneralInfoMenu />}
              <div
                className={s.orderBlockToFill__list_item}
                onClick={() => setIsOrderHistoryMenuOpen(!isOrderHistoryMenuOpen)}
              >
                <p className={s.list_itemText}>Історія замовлення</p>
                {isOrderHistoryMenuOpen ? (
                  <ArrowToTopFlatIcon size={32} />
                ) : (
                  <ArrowToBottomIcon size={32} />
                )}
              </div>
              {isOrderHistoryMenuOpen && <GeneralInfoMenu />}
            </div>
            <div className={s.orderBlockToFill__buttons}>
              <button type="button" className={s.orderBlockToFill__buttons_removeBtn}>
                ВИДАЛИТИ
              </button>
              <button type="button" className={s.orderBlockToFill__buttons_saveBtn}>
                ЗБЕРЕГТИ ЗМІНИ
              </button>
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  )
}

export default CreateNewOrder
