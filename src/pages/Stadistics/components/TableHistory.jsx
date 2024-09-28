import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import TableHistoryRow from "./TableHistoryRow"

const TableHistory = (props) => {
  const [mode, setMode] = useState("none")
  const cardList = useSelector((state) => state.card)
  const stadistic = useSelector((state) => state.stadistic)

  return (
    <Box className="table-history">
      <Box className="table-history__buttons">
        <Button
          className={
            mode === "multiple" ? "button--primary--active" : "button--primary"
          }
          sx={{ textTransform: "none" }}
          onClick={() => setMode("multiple")}
        >
          Selección multiple
        </Button>
        <Button
          className={
            mode === "multipleInverse"
              ? "button--primary--active"
              : "button--primary"
          }
          sx={{ textTransform: "none" }}
          onClick={() => setMode("multipleInverse")}
        >
          Selección multiple inverso
        </Button>
        <Button
          className={
            mode === "vsbot" ? "button--primary--active" : "button--primary"
          }
          sx={{ textTransform: "none" }}
          onClick={() => setMode("vsbot")}
        >
          Competencia contra bot
        </Button>
      </Box>
      <Table arial-label="table history card">
        <TableHead className="table-history__head">
          <TableRow>
            <TableCell />
            <TableCell className="table-history__head__cell">
              Título tarjeta
            </TableCell>
            <TableCell className="table-history__head__cell" align="center">
              id
            </TableCell>
            <TableCell className="table-history__head__cell" align="center">
              Dificultad
            </TableCell>
            <TableCell className="table-history__head__cell" align="center">
              Frequencia
            </TableCell>
            <TableCell className="table-history__head__cell" align="center">
              Categoría
            </TableCell>
            <TableCell className="table-history__head__cell" align="center">
              % Acierto
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-history__body">
          {cardList.length !== 0 &&
            mode !== "none" &&
            cardList.map((c, index) => (
              <TableHistoryRow
                key={`history row ${index}`}
                card={c}
                answerHistory={mode !== "none" ? stadistic[mode].answer : []}
              />
            ))}
          {cardList.length === 0 && (
            <TableRow className="table-history--no-history">
              <TableCell align="center" colSpan={7}>
                <Typography>Sin tarjetas creadas</Typography>
              </TableCell>
            </TableRow>
          )}
          {mode === "none" && (
            <TableRow className="table-history--no-history">
              <TableCell align="center" colSpan={7}>
                <Typography>
                  Seleccione un modo juego para la revisión
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}

TableHistory.propTypes = {}

export default TableHistory
