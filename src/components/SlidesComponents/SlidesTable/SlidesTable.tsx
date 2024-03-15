import React, { useState } from "react"
import { useSelector } from "react-redux"
import { GridRowId } from "@mui/x-data-grid"
import { columns } from "./columns"
import { deleteSlide } from "src/redux/slides/operations"
import { selectCount } from "src/redux/slides/selectors"
import { useAppDispatch } from "src/redux/hooks"
import ActionableTable from "src/components/ActionableTable"
import ActionsColumn from "src/components/ActionsColumn"
import ModalWindow from "src/components/ModalWindow"
import SlideManagementForm from "../SlideManagementForm"
import { ISlide } from "src/types/slides"

interface IProps {
  slides: ISlide[]
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const SlidesTable: React.FC<IProps> = ({ slides, page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const count = useSelector(selectCount)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState<GridRowId | 0>(0)

  const getActions = (id: GridRowId) => [
    <ActionsColumn
      onEditClick={() => {
        setIsOpenModal(true)
        setSelectedSlide(id)
      }}
      onDeleteClick={() => {
        dispatch(deleteSlide(id))
      }}
    />,
  ]

  return (
    <>
      <ActionableTable
        columns={columns}
        rows={slides}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        count={count}
        getActions={getActions}
      />

      <ModalWindow
        title={"РЕДАГУВАТИ СЛАЙД"}
        onClose={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
      >
        <SlideManagementForm
          slide={slides.find(slide => slide.id === selectedSlide)}
          onClose={() => setIsOpenModal(false)}
        />
      </ModalWindow>
    </>
  )
}

export default SlidesTable
