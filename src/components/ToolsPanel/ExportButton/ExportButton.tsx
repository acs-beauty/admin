import React from "react"
import s from "./ExportButton.module.scss"
import * as XLSX from "xlsx"
import { OrdersColumn, OrdersRow } from "../../../types/IOrders.ts"
import { IBrand } from "src/types/brands/IBrand.ts"
import { GridColDef } from "@mui/x-data-grid"
import { INovelty } from "src/types/news/INovelty.ts"
import { ISlide } from "src/types/slides/ISlide.ts"

interface Props {
  columns: OrdersColumn[] | GridColDef[]
  rows: OrdersRow[] | IBrand[] | INovelty[] | ISlide[]
}

const ExportButton: React.FC<Props> = ({ columns, rows }) => {
  const onClick = () => {
    const ws = XLSX.utils.json_to_sheet(
      [columns.map(col => col.headerName), ...rows.map(row => columns.map(col => row[col.field]))],
      { skipHeader: true }
    )

    const colWidths = columns.map(col => {
      const maxContentLength = Math.max(
        col.headerName.length,
        ...rows.map(row => String(row[col.field]).length)
      )
      return { wch: maxContentLength + 2 }
    })
    ws["!cols"] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

    XLSX.writeFile(wb, "exported_data.xlsx")
  }

  return (
    <button className={s.container} onClick={onClick}>
      Експортувати
    </button>
  )
}

export default ExportButton
