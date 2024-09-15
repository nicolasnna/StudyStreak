import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import Header from "@components/Header"

const PageNotFound = ({
  labelError = "Página no encontrada",
  subtitle = "Selecciona una de las rutas de la NavBar",
}) => {
  return (
    <Box paddingY={6}>
      <Header Title={`Error 404 - ${labelError}`} SubTitle={subtitle} />
    </Box>
  )
}

PageNotFound.propTypes = {
  labelError: PropTypes.string,
  subtitle: PropTypes.string,
}

export default PageNotFound
