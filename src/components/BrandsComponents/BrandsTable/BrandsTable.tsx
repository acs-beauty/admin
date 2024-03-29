import React, { useState } from "react"
import { useSelector } from "react-redux"
import { GridRowId } from "@mui/x-data-grid"

import ModalWindow from "src/components/ModalWindow"
import ActionsColumn from "src/components/ActionsColumn"
import BrandManagementForm from "../BrandManagementForm"
import ActionableTable from "src/components/ActionableTable"

import { columns } from "./columns"
import { deleteBrand } from "src/redux/brands/operations"
import { selectCount } from "src/redux/brands/selectors"
import { useAppDispatch } from "src/redux/hooks"
import { IBrand } from "src/types/brands"

interface IProps {
  brands: IBrand[]
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const BrandsTable: React.FC<IProps> = ({ brands, page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const count = useSelector(selectCount)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<GridRowId | 0>(0)

  const getActions = (id: GridRowId) => [
    <ActionsColumn
      onEditClick={() => {
        setIsOpenModal(true)
        setSelectedBrand(id)
      }}
      onDeleteClick={() => {
        dispatch(deleteBrand(id))
      }}
    />,
  ]

  return (
    <>
      <ActionableTable
        columns={columns}
        rows={brands}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        count={count}
        getActions={getActions}
      />

      <ModalWindow
        title={"РЕДАГУВАТИ БРЕНД"}
        onClose={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
      >
        <BrandManagementForm
          brand={brands.find(brand => brand.id === selectedBrand)}
          onClose={() => setIsOpenModal(false)}
        />
      </ModalWindow>
    </>
  )
}

export default BrandsTable
