import React from "react"
import PropTypes from "prop-types"
import TableHistory from "./TableHistory"
import useWindowSize from "@hooks/useWindowSize"
import { Box, Typography } from "@mui/material"
import { sizeScreen } from "@utils/constants"

const ResponsiveTableHistory = (props) => {
  const { width } = useWindowSize()

  if (width < sizeScreen.MOBILE) {
    return (
      <Box className="table-history--responsive">
        <Typography>
          La visualización de las estadísticas de cada tarjeta no está
          disponible en pantallas pequeñas.
        </Typography>
      </Box>
    )
  }

  return <TableHistory />
}

ResponsiveTableHistory.propTypes = {}

export default ResponsiveTableHistory
