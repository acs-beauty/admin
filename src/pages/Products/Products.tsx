import AdminLayout from "../../layouts/AdminLayout.tsx"
import ArrowToLeft from "../../images/svg/ArrowToLeft"
import s from "../Products/Products.module.scss"
import CheckboxSlide from "../../components/CheckboxSlide/CheckboxSlide"
import React from "react"
import AddIcon from "../../images/svg/AddIcon_.tsx"
import PlusIcon from "../../images/svg/PlusIcon.tsx"
import { array } from "yup"
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop.tsx"

const Products = () => {

  const onFileChange = (files: File[]) => {
    console.log(files);
  }

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__title}>
            <ArrowToLeft />
            <h2 className={s.main__title_text}>Створити новий товар</h2>
          </div>
          <div className={s.products_state}>
            <CheckboxSlide />
          </div>

          <div className={s.form__section}>
            <DragAndDrop onFileChange={(files) => onFileChange(files)}/>
          </div>
        </section>

      </main>

    </AdminLayout>
  )
}

export default Products