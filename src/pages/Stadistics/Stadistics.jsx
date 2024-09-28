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
        SubTitle="Revisa tus resultados a lo largo del tiempo"
      />
      <ResumeBot />
      <ResponsiveTableHistory />
    </Box>
  )
}

Stadistics.propTypes = {}

export default Stadistics
