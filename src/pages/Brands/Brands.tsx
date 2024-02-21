import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/redux/hooks"
import { getBrands } from "src/redux/brands/operations"
import { selectBrands } from "src/redux/brands/selectors"
import { columns } from "../../components/BrandsComponents/BrandsTable/columns"

import s from "./Brands.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import PageToolsPanel from "src/components/PageControls"
import ModalWindow from "src/components/ModalWindow/ModalWindow"
import BrandsTable from "src/components/BrandsComponents/BrandsTable"
import BrandManagementForm from "src/components/BrandsComponents/BrandManagementForm"

const Brands: React.FC = () => {
  const dispatch = useAppDispatch()
  const brands = useSelector(selectBrands)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    dispatch(
      getBrands({
        lookup: searchName,
        pageSize,
        page: page + 1,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchName])

  return (
    <AdminLayout>
      <main className={s.brand}>
        <section className={s.brand__section}>
          <PageToolsPanel
            title="Бренди"
            btnTitle="ДОДАТИ БРЕНД"
            setSearchName={setSearchName}
            setIsOpenModal={setIsOpenModal}
            rows={brands}
            columns={columns}
          />

          <BrandsTable
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            brands={brands}
          />
        </section>
        <ModalWindow
          title={"ДОДАТИ БРЕНД"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        >
          <BrandManagementForm onClose={() => setIsOpenModal(false)} />
        </ModalWindow>
      </main>
    </AdminLayout>
  )
}

export default Brands
