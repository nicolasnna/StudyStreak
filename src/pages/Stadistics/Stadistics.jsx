import Header from "@components/Header"
import { Box } from "@mui/material"
import React from "react"
import ResponsiveTableHistory from "./components/ResponsiveTableHistory"
import ResumeBot from "./components/ResumeBot"

const Stadistics = (props) => {
  return (
    <Box>
      <Header
        Title="Estadísticas de juego"
        SubTitle="Revisa tus resultados en cada modo de juego"
      />
      <ResumeBot />
      <ResponsiveTableHistory />
    </Box>
  )
}

Stadistics.propTypes = {}

export default Stadistics
