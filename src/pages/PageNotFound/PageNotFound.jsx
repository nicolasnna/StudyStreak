import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import Header from "@components/Header"

const PageNotFound = (props) => {
  return (
    <Box paddingY={6}>
      <Header
        Title={"Error   404 - Página no encontrada"}
        SubTitle="Selecciona una de las rutas de la NavBar"
      />
    </Box>
  )
}

PageNotFound.propTypes = {}

export default PageNotFound
