import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/redux/hooks"
import { getSlides } from "src/redux/slides/operations"
import { selectSlides } from "src/redux/slides/selectors"
import s from "./Slides.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import ModalWindow from "src/components/ModalWindow/ModalWindow"
import SlideManagementForm from "src/components/SlidesComponents/SlideManagementForm"
import SlidesTable from "src/components/SlidesComponents/SlidesTable"
import PageToolsPanel from "src/components/PageControls"
import { columns } from "../../components/SlidesComponents/SlidesTable/columns"

const Slides: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const slides = useSelector(selectSlides)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    dispatch(
      getSlides({
        pageSize,
        page: page + 1,
      })
    )
  }, [page, pageSize])

  return (
    <AdminLayout>
      <main className={s.slide}>
        <section className={s.slide__section}>
          <PageToolsPanel
            title="Слайди"
            btnTitle="ДОДАТИ СЛАЙД"
            setSearchName={() => {}}
            setIsOpenModal={setIsOpenModal}
            rows={slides}
            columns={columns}
          />

          <SlidesTable
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            slides={slides}
          />
        </section>
        <ModalWindow
          title={"ДОДАТИ СЛАЙД"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        >
          <SlideManagementForm onClose={() => setIsOpenModal(false)} />
        </ModalWindow>
      </main>
    </AdminLayout>
  )
}

export default Slides
