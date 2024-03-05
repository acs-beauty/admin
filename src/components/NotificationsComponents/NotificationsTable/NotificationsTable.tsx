import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteItem } from "../../../redux/notifications/slice.tsx"
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import RateReviewIcon from "@mui/icons-material/RateReview"
import DeleteIcon from "../../../images/svg/DeleteIcon.tsx"
import s from "./NotificationsTable.module.scss"

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  )
}

interface INotificationList {
  id: number | string
  time: string
  date: string
  status: string
  contentType: string
  content: string
}

interface IProps {
  rows: INotificationList[]
}

const NotificationsTable: FC<IProps> = ({ rows }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRemoveItem = (id: any) => {
    dispatch(deleteItem(id))
  }

  const handleClickItem = (event: React.MouseEvent<HTMLElement>, row: any) => {
    if (row.contentType === "order") {
      navigate("/orders")
    } else if (row.contentType === "feedback") {
      navigate("/reviews")
    }
  }

  return (
    <>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody sx={{ border: 0 }}>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow className={s.row} key={index} onClick={e => handleClickItem(e, row)}>
                <TableCell component="th" scope="row" sx={{ width: 50, paddingLeft: 0 }}>
                  {row.time}
                </TableCell>
                <TableCell align="left" sx={{ width: 82 }}>
                  {row.date}
                </TableCell>
                <TableCell align="left" sx={{ width: 30 }}>
                  {row.contentType === "order" ? (
                    <ShoppingBasketIcon className={s.icon} />
                  ) : (
                    <RateReviewIcon className={s.icon} />
                  )}
                </TableCell>
                <TableCell align="left">{row.content}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    onClick={e => {
                      e.stopPropagation()
                      handleRemoveItem(row.id)
                    }}
                    className={s.delete_icon}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        slotProps={{
          select: {
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  )
}

export default NotificationsTable
