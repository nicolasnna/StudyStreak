import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import PropTypes from "prop-types"
import { Fragment, useState } from "react"

const TableHistoryRow = ({ card, answerHistory = [] }) => {
  const [open, setOpen] = useState(false)
  const cardHistory = answerHistory.filter((a) => a.cardId === card.id)

  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="table-history__body__row"
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon className="table-history__icon" />
            ) : (
              <KeyboardArrowDownIcon className="table-history__icon" />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          className="table-history__body__row__cell"
          component="th"
          scope="row"
        >
          {card.question}
        </TableCell>
        <TableCell className="table-history__body__row__cell" align="center">
          {card.id}
        </TableCell>
        <TableCell className="table-history__body__row__cell" align="center">
          {card.difficulty}
        </TableCell>
        <TableCell className="table-history__body__row__cell" align="center">
          {card.revision_frequency}
        </TableCell>
        <TableCell className="table-history__body__row__cell" align="center">
          {card.tags}
        </TableCell>
        <TableCell className="table-history__body__row__cell" align="center">
          {cardHistory.length > 0 &&
            (
              (cardHistory.filter((a) => a.isCorrect).length /
                cardHistory.length) *
              100
            ).toFixed(0)}
          %
        </TableCell>
      </TableRow>
      <TableRow className="table-history__body__row--history">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="table-history__body__row--history__content">
              <Typography className="table-history__body__row--history__content--title">
                Historial
              </Typography>
              <Table
                size="small"
                aria-label="answer-history"
                className="table-history__body__row--history__content--table"
              >
                <TableHead className="table-history__body__row--history__content__head">
                  <TableRow>
                    <TableCell className="table-history__body__row--history__content__head__cell">
                      Fecha
                    </TableCell>
                    <TableCell className="table-history__body__row--history__content__head__cell">
                      Respuesta
                    </TableCell>
                    <TableCell className="table-history__body__row--history__content__head__cell">
                      Tiempo de respuesta
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-history__body__row--history__content__body">
                  {cardHistory.length > 0 &&
                    cardHistory.map((history, index) => (
                      <TableRow
                        key={`row ${index} id ${card.id}`}
                        className="table-history__body__row--history__content__body--row"
                      >
                        <TableCell component="th" scope="row">
                          {history.date.year}-{history.date.month}-
                          {history.date.day} {history.date.hour}:
                          {history.date.minute}:{history.date.seconds}
                        </TableCell>
                        <TableCell>
                          {history.isCorrect ? "correcta" : "incorrecta"}
                        </TableCell>
                        <TableCell>{history.timeSpent} seg.</TableCell>
                      </TableRow>
                    ))}
                  {cardHistory.length === 0 && (
                    <TableRow className="table-history--no-history">
                      <TableCell align="center" colSpan={3}>
                        <Typography>Sin historial</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

TableHistoryRow.propTypes = {
  card: PropTypes.object.isRequired,
  answerHistory: PropTypes.array,
}

export default TableHistoryRow
