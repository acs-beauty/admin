import React from "react"

import s from "./PageControls.module.scss"
import SearchInput from "../ToolsPanel/SearchInput/SearchInput"
import ExportButton from "../ToolsPanel/ExportButton/ExportButton"

import { IBrand } from "src/types/brands"
import { GridColDef } from "@mui/x-data-grid"
import { INovelty } from "src/types/news"
import { ISlide } from "src/types/slides"

interface IProps {
  rows: IBrand[] | INovelty[] | ISlide[]
  columns: GridColDef[]
  title: string
  btnTitle: string
  setSearchName: (value: string) => void
  setIsOpenModal: (value: boolean) => void
}

const PageControls: React.FC<IProps> = ({
  rows,
  columns,
  title,
  btnTitle,
  setSearchName,
  setIsOpenModal,
}) => {
  return (
    <>
      <div
        className={`${s.page_tools__title} ${title === "Слайди" ? s.page_tools__title_slides : ""}`}
      >
        <h2 className={s.page_tools__title_text}>{title}</h2>
        <button type="button" className={s.page_tools__button} onClick={() => setIsOpenModal(true)}>
          {btnTitle}
        </button>
      </div>

      <div
        className={`${s.page_tools__tools_group} ${
          title === "Слайди" ? s.page_tools__nosearch : ""
        }`}
      >
        {title !== "Слайди" && <SearchInput onChange={setSearchName} />}
        <ExportButton rows={rows} columns={columns} />
      </div>
    </>
  )
}

export default PageControls
