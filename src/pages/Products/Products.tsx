import AdminLayout from "../../layouts/AdminLayout.tsx"
import ArrowToLeft from "../../images/svg/ArrowToLeft"
import s from "../Products/Products.module.scss"
import React from "react"
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop.tsx"
import AddProduct from "../../components/AddProduct/AddProduct.tsx"

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
          {/*<div className={s.products_state}>*/}
          {/*  <CheckboxSlide />*/}
          {/*</div>*/}

          <div className={s.form__section}>
            <DragAndDrop onFileChange={(files) => onFileChange(files)}/>
          </div>
        </section>
        <AddProduct />

      </main>

    </AdminLayout>
  )
}

export default Products